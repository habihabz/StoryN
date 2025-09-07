using Erp.Server.Middleware;
using Erp.Server.Models;
using Erp.Server.Repository;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ---------------- CORS ----------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins(
            "http://localhost:4200",
            "http://localhost:82",
            "http://192.168.29.251:82",
            "https://storynarg.com")
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

// ---------------- Authentication ----------------
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes("KDSFADSJFNFDGJASDFGADFNEJFWRWERdDSFHAKSD")),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

// ---------------- Swagger ----------------
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\""
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// ---------------- Database ----------------
builder.Services.AddDbContext<DBContext>(options =>
{
    var connectionString = builder.Environment.IsDevelopment()
        ? builder.Configuration.GetConnectionString("DevelopmentConnectionStr")
        : builder.Configuration.GetConnectionString("ConnectionStr");

    if (string.IsNullOrEmpty(connectionString))
    {
        throw new Exception("Database connection string is missing in configuration.");
    }

    options.UseSqlServer(connectionString, sqlServerOptions =>
        sqlServerOptions.EnableRetryOnFailure(5, TimeSpan.FromSeconds(30), null));
});

// ---------------- Repositories & Services ----------------
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton<IJwtAuthManager, JwtAuthManager>();
builder.Services.Configure<PublicVariables>(builder.Configuration.GetSection("PublicVariables"));
builder.Services.AddTransient<IUser, UserRepository>();
builder.Services.AddTransient<IRole, RoleRepository>();
builder.Services.AddTransient<ILogin, LoginRepository>();
builder.Services.AddTransient<IPurchaseOrder, PurchaseOrderRepository>();
builder.Services.AddTransient<IMenu, MenuRepository>();
builder.Services.AddTransient<IRoleMenu, RoleMenuRepository>();
builder.Services.AddTransient<ISupplier, SupplierRepository>();
builder.Services.AddTransient<ICustomer, CustomerRepository>();
builder.Services.AddTransient<IExpense, ExpenseRepository>();
builder.Services.AddTransient<IIncome, IncomeRepository>();
builder.Services.AddTransient<ICategory, CategoryRepository>();
builder.Services.AddTransient<IMasterData, MasterDataRepository>();
builder.Services.AddTransient<IProduct, ProductRepository>();
builder.Services.AddTransient<IFeedback, FeedbackRepository>();
builder.Services.AddTransient<IProductReview, ProductReviewRepository>();
builder.Services.AddTransient<ISellingPrice, sellingPriceRepository>();
builder.Services.AddTransient<ICart, CartRepository>();
builder.Services.AddTransient<ICustomerOrder, CustomerOrderRepository>();
builder.Services.AddTransient<ICustomerOrderStatus, CustomerOrderStatusRepository>();
builder.Services.AddTransient<IAddress, AddressRepository>();
builder.Services.AddTransient<IStory, StoryRepository>();
builder.Services.AddTransient<IStep, StepRepository>();
builder.Services.AddTransient<IAnswer, AnswerRepository>();
builder.Services.AddTransient<IFileUpload, FileUploadService>();
builder.Services.AddTransient<IRoom, RoomRepository>();
builder.Services.AddTransient<IClient, ClientRepository>();
builder.Services.AddTransient<IRoomStory, RoomStoryRepository>();

// ---------------- App Pipeline ----------------
var app = builder.Build();

app.UseDeveloperExceptionPage();
// Swagger must be before auth so docs can load without a token
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = "swagger";
    });
//}

app.Use(async (context, next) =>
{
    try
    {
        await next.Invoke();
    }
    catch (Exception ex)
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "text/plain";
        await context.Response.WriteAsync($"ERROR: {ex}");
    }
});
app.UseCors("AllowSpecificOrigin");
app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Map fallback for SPA last
app.MapFallbackToFile("index.html");

app.Run();

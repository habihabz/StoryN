using Erp.Server.Middleware;
using Erp.Server.Models;
using Erp.Server.Repository;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.FileProviders;
using System.Text;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("http://localhost:4200", "http://localhost:82", "http://192.168.29.251:82")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// JWT Authentication
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
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("KDSFADSJFNFDGJASDFGADFNEJFWRWERdDSFHAKSD")),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

// Swagger
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
            new string[] {}
        }
    });
});

// Database + DI
builder.Services.AddDbContext<DBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionStr")));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Services
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

var app = builder.Build();

// Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    c.RoutePrefix = string.Empty; // This serves Swagger UI at http://localhost:81/
});

// CORS + HTTPS
app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();

// Serve wwwroot (if used)
app.UseStaticFiles();

// Auth
app.UseAuthentication();
app.UseAuthorization();

// Routes
app.MapControllers();

// Run
app.Run();

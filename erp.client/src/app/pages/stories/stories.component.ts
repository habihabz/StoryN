import { Component, ElementRef, ViewChild } from '@angular/core';
import { GridService } from '../../services/igrid.service';
import { AgGridAngular } from 'ag-grid-angular';
import { IuserService } from '../../services/iuser.service';
import { Router } from '@angular/router';
import { ICustomerService } from '../../services/icustomer.service';
import { SnackBarService } from '../../services/isnackbar.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { IMasterDataService } from '../../services/imaster.data.service';
import { ICategoryService } from '../../services/icategory.service';
import { DbResult } from '../../models/dbresult.model';
import { MasterData } from '../../models/master.data.model';
import { RequestParms } from '../../models/requestParms';
import { ProdAttachement } from '../../models/prod.attachments.model';
import { environment } from '../../../environments/environment';
import { IStoryService } from '../../services/istory.service';
import { Story } from '../../models/story.model';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../models/category.model';
declare var $: any;

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.css'
})
export class StoriesComponent {
  private apiUrl = `${environment.serverHostAddress}`;
  imageUrl: string = '';
  pagination = true;
  paginationPageSize5 = 5;
  paginationPageSizeSelector5 = [5, 10, 20, 50, 100];
  paginationPageSize10 = 10;
  paginationPageSizeSelector10 = [10, 20, 50, 100];
  domLayout: DomLayoutType = 'autoHeight';
  currentUser: User = new User();
  subscription: Subscription = new Subscription();
  stories: Story[] = [];
  story: Story = new Story();
  dbResult: DbResult = new DbResult();
  categories: Category[] = [];
  requestParms: RequestParms = new RequestParms();
  prodAttachement: ProdAttachement = new ProdAttachement();
  prodAttachements: ProdAttachement[] = [];
  imagePreviews: string[] = [];
  selectedFile: File | null = null;

  @ViewChild('storiesGrid') storysGrid!: AgGridAngular;

  constructor(
    private iuserService: IuserService,
    private elRef: ElementRef,
    private router: Router,
    private icustomerService: ICustomerService,
    private snackBarService: SnackBarService,
    private igridService: GridService,
    private istoryService: IStoryService,
    private imasterDataService: IMasterDataService,
    private icategoryService: ICategoryService,
    private http: HttpClient

  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id === 0) {
      this.router.navigate(['login']);
    }
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "st_id" },
    { headerName: "Name", field: "st_name" },
    { headerName: "Description", field: "st_description" },
    { headerName: "Category", field: "st_category_name" },
    {
      headerName: 'Image', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: '', action: 'onViewImage', cssClass: 'btn btn-default', icon: 'fa fa-eye', onViewImage: (data: any) => this.onAction('viewImage', data)
      },
    },
    {
      headerName: 'Steps', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Step', action: 'onSteps', cssClass: 'btn btn-standard', icon: 'fa fa-list', onSteps: (data: any) => this.onAction('steps', data)
      },
    },
    {
      headerName: 'Edit', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Edit', action: 'onEdit', cssClass: 'btn btn-info', icon: 'fa fa-edit', onEdit: (data: any) => this.onAction('edit', data)
      },
    },
    {
      headerName: 'Delete', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Delete', action: 'onDelete', cssClass: 'btn btn-danger', icon: 'fa fa-trash', onDelete: (data: any) => this.onAction('delete', data)
      },
    },
    { headerName: "Created By", field: "st_cre_by_name" },
    { headerName: "Created Date", field: "st_cre_date" },
  ];

  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };

  defaultColDef = {
    sortable: true,
    filter: true
  };

  ngOnInit(): void {
    this.getStories();
    this.getCategories();
    this.subscription.add(
      this.istoryService.refreshStories$.subscribe(() => {
        this.getStories();
      })

    );
  }


  getMasterDatasByType(masterType: string, callback: (data: MasterData[]) => void): void {
    this.requestParms = new RequestParms();
    this.requestParms.type = masterType;
    this.imasterDataService.getMasterDatasByType(this.requestParms).subscribe(
      (data: MasterData[]) => {
        callback(data);  // Pass the data to the callback function
      },
      (error: any) => {
        this.snackBarService.showError('Error fetching master data ' + error);
        callback([]);  // Pass an empty array if there's an error
      }
    );
  }

  onAction(action: string, data: any) {
    switch (action) {
      case 'edit':
        this.onEdit(data);
        break;
      case 'delete':
        this.onDelete(data);
        break;
      case 'viewImage':
        this.onViewImage(data);
        break;
      case 'steps':
        this.onSteps(data);
        break;

      default:
        this.snackBarService.showError("Unknown Action " + action);;
    }
  }


  onEdit(data: any) {

    this.istoryService.getStory(data.st_id).subscribe(
      (data: Story) => {
        this.story = data;
        this.imagePreviews = this.prodAttachements.map(
          (x) => `${environment.serverHostAddress}/${x.pa_image_path}`
        );

        $('#storyFormModal').modal('show');


      },
      (error: any) => {
        console.error('Error fetching story', error);
      }
    );
  }

  onViewImage(data: any) {
    this.imageUrl = `https://localhost:7299/${data.st_image}`;
    $('#storyImageModal').modal('show');
  }

  onSteps(data: any) {
    $('#stepFormModal').modal('show');
  }

  // Helper to parse JSON fields safely
  private parseJSON(value: any): any {
    return typeof value === 'string' ? JSON.parse(value) : value;
  }

  OnCategoryChange(c_id: number) {
    this.story.st_category = c_id;
  }

  onDelete(data: any) {
    this.istoryService.deleteStory(data.st_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.stories = this.stories.filter(s => s.st_id !== data.st_id);
          this.snackBarService.showSuccess("Successfully Removed");

        } else {
          alert(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting income', error);
      }
    );
  }

  onDetail(data: any) {

  }


  getStories() {
    this.istoryService.getStories().subscribe(
      (data: Story[]) => {
        this.stories = data;
        this.storysGrid.api.sizeColumnsToFit();
      },
      (error: any) => {
      }
    );
  }
  onGridReady(event: GridReadyEvent) {
    this.storysGrid.api.sizeColumnsToFit();

  }

  openCreateFormModal(): void {
    this.story = new Story();
    $('#storyFormModal').modal('show');
    $('#myTab a[href="#details"]').tab('show');
  }


  createOrUpdateStory() {
    const formData = new FormData();

    formData.append("st_id", this.story.st_id?.toString() || "0");
    formData.append("st_name", this.story.st_name || "");
    formData.append("st_description", this.story.st_description || "");
    formData.append("st_category", this.story.st_category?.toString() || "0");
    formData.append("st_active_yn", this.story.st_active_yn || "Y");
    formData.append("st_cre_by", this.currentUser.u_id.toString());
    if (this.selectedFile) {
      formData.append("file", this.selectedFile);
    }
    this.story.st_cre_by = this.currentUser.u_id;
    this.istoryService.createOrUpdateStory(formData).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          this.istoryService.refreshStories();
          $('#storyFormModal').modal('hide');
          this.selectedFile = null;
          const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
          if (fileInput) fileInput.value = '';
          this.story = new Story();
        } else {
          alert(data.message);
        }
      },
      (error: any) => {

      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
  getCategories(): void {
    this.icategoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error: any) => {
        console.error('Error fetching categories', error);
      }
    );
  }
}
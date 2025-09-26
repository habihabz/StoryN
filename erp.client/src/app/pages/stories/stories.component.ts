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
import { Step } from '../../models/step.model';
import { IStepService } from '../../services/istep.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IAnswerService } from '../../services/ianswer.service';
import { DataTableStructure } from '../../methods/datatable.structure';
import { format } from 'date-fns';
declare var $: any;

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrl: './stories.component.css'
})
export class StoriesComponent {
  apiUrl = `${environment.serverHostAddress}/api/`;
  attachmentUrl = `${environment.attachmentAddress}`;
  attachmentFullPath: string = '';
  attachmentColumn: string = '';
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
  selectedStartFile: File | null = null;
  selectedEndFile: File | null = null;
  selectedStepFile: File | null = null;
  selectedTrailerFile: File | null = null;
  attachmentTabSelected: string = 'trailer';

  steps: Step[] = [];
  step: Step = new Step();
  storyTypes: MasterData[] = [];
  reportData: any[] = [];

  @ViewChild('storiesGrid') storysGrid!: AgGridAngular;
  @ViewChild('reportGrid') reportGrid!: AgGridAngular;
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
    private istepService: IStepService,
    private http: HttpClient,
    private ianswerService: IAnswerService,
    private dataTableStructure: DataTableStructure,

  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id === 0) {
      this.router.navigate(['login']);
    }
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "st_id" },
    { headerName: "Name", field: "st_name" },
    { headerName: "Type", field: "st_type_name" },
    { headerName: "Category", field: "st_category_name" },
    {
      headerName: 'Attachments', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: '', action: 'onViewAttachments', cssClass: 'btn btn-default', icon: 'fa fa-paperclip', onViewAttachments: (data: any) => this.onAction('viewAttachments', data)
      },
    },
    {
      headerName: 'Steps', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Step', action: 'onSteps', cssClass: 'btn btn-standard', icon: 'fa fa-list', onSteps: (data: any) => this.onAction('steps', data)
      },
    },
    {
      headerName: 'Analytics', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: 'Analytics', action: 'onAnalytics', cssClass: 'btn btn-warning', icon: 'fa fa-line-chart', onAnalytics: (data: any) => this.onAction('analytics', data)
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
    {
      headerName: "Description",
      field: "st_description",
      valueFormatter: (params) => params.value ? params.value.substring(0, 100) : ''
    },
    { headerName: "Created By", field: "st_cre_by_name" },
    {
      headerName: "Created On",
      field: "st_cre_date",
      valueFormatter: (params) => {
        return format(new Date(params.value), 'yyyy-MM-dd hh:mm:ss a');
      },
    }

  ];
  reportDefs: ColDef[] = [];
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
    this.getMasterDatasByType("StoryType", (data) => { this.storyTypes = data; });
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
      case 'viewAttachments':
        this.onViewAttachments(data);
        break;
      case 'steps':
        this.onSteps(data);
        break;
      case 'analytics':
        this.onAnalytics(data);
        break;
      default:
        this.snackBarService.showError("Unknown Action " + action);;
    }
  }


  onEdit(data: any) {

    this.istoryService.getStory(data.st_id).subscribe(
      (data: Story) => {
        this.story = data;
        this.setSelect2Values();
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


  onViewAttachments(data: any) {
    this.getAttachmentByType(data, "trailer");
    this.story = data;
    $('#attachmentModal').modal('show');

  }

  getAttachmentByType(data: any, type: string) {
    switch (type) {
      case 'trailer':
        this.attachmentFullPath = `${data.st_trailer}`;
        this.attachmentColumn = data.st_trailer;
        break;
      case 'poster':
        this.attachmentFullPath = `${data.st_image}`;
        this.attachmentColumn = data.st_image;
        break;
      case 'starting':
        this.attachmentFullPath = `${data.st_start_image}`;
        this.attachmentColumn = data.st_start_image;
        break;
      case 'ending':
        this.attachmentFullPath = `${data.st_end_image}`;
        this.attachmentColumn = data.st_end_image;
        break;
      default: break;
    }
  }

  onAttachmentTabChange(event: any) {
    const tabLabel = event.tab.textLabel.toLowerCase();
    this.attachmentTabSelected = tabLabel;
    this.getAttachmentByType(this.story, tabLabel);
  }

  deleteAttachment() {
    this.requestParms.story = this.story.st_id;
    this.requestParms.type = this.attachmentTabSelected;
    this.requestParms.user = this.currentUser.u_id;
    this.istoryService.deleteAttachment(this.requestParms).subscribe(
      (data: DbResult) => {
        if (data.message == "Success") {
          this.getStory(this.story.st_id);
          this.getAttachmentByType(this.story, this.attachmentTabSelected);
          this.snackBarService.showSuccess("Successfully Removed");
          setTimeout(() => {
            this.getAttachmentByType(this.story, this.attachmentTabSelected);
          }, 300);
        } else {
          this.snackBarService.showSuccess(data.message);
        }
      },
      (error: any) => {
      }
    );

  }


  onSteps(data: any) {
    this.story = data;
    this.getStepsOfAStory();

    $('#stepFormModal').modal('show');
  }

  onAnalytics(data: any) {
    this.story = data;
    this.getSubmittedStoryAnswers(this.story.st_id);
    $('#analyticsModal').modal('show');
  }


  getStepsOfAStory() {
    this.istepService.getStepsOfAStory(this.story.st_id).subscribe(
      (data: Step[]) => {
        this.steps = data;
      },
      (error: any) => {
      }
    );
  }

  // Helper to parse JSON fields safely
  private parseJSON(value: any): any {
    return typeof value === 'string' ? JSON.parse(value) : value;
  }

  OnCategoryChange(c_id: number) {
    this.story.st_category = c_id;
  }
  OnTypeChange(st_type: number) {
    this.story.st_type = st_type;
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
        setTimeout(() => {
          if (this.storysGrid?.api) {
            this.storysGrid.api.autoSizeAllColumns();
          }
        }, 500);
      },
      (error: any) => {
      }
    );
  }

  onGridReady(event: GridReadyEvent) {
    this.storysGrid.api.autoSizeAllColumns();

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
    formData.append("st_type", this.story.st_type?.toString() || "0");
    formData.append("st_active_yn", this.story.st_active_yn || "Y");
    formData.append("st_cre_by", this.currentUser.u_id.toString());
    if (this.selectedTrailerFile) {
      formData.append("trailer", this.selectedTrailerFile);
    }
    if (this.selectedFile) {
      formData.append("file", this.selectedFile);
    }
    if (this.selectedStartFile) {
      formData.append("startImage", this.selectedStartFile);
    }
    if (this.selectedEndFile) {
      formData.append("endImage", this.selectedEndFile);
    }
    this.story.st_cre_by = this.currentUser.u_id;
    this.istoryService.createOrUpdateStory(formData).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          this.istoryService.refreshStories();
          $('#storyFormModal').modal('hide');
          this.selectedFile = null;
          this.selectedStartFile = null;
          this.selectedEndFile = null;
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


  onFileSelectedForStep(event: any): void {
    const file = event.target.files[0];
    this.selectedStepFile = file ? file : null;
  }

  get selectedFileNameOfStep(): string {
    return this.selectedStepFile ? this.selectedStepFile.name : '';
  }
  createOrUpdateStep() {

    const formData = new FormData();
    formData.append("sp_id", this.step.sp_id?.toString() || "0");
    formData.append("sp_story", this.story.st_id?.toString() || "0");
    formData.append("sp_question", this.step.sp_question || "");
    formData.append("sp_attachment", this.step.sp_attachment || "");
    formData.append("sp_hint", this.step.sp_hint || "");
    formData.append("sp_answer", this.step.sp_answer || "");
    formData.append("sp_priority", this.step.sp_priority?.toString() || "0");
    formData.append("sp_cre_by", this.currentUser.u_id.toString());

    if (this.selectedStepFile) {
      formData.append("file", this.selectedStepFile);
    }

    this.step.sp_cre_by = this.currentUser.u_id;

    this.istepService.createOrUpdateStep(formData).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          this.istepService.refreshSteps();
          this.selectedStepFile = null;
          this.getStepsOfAStory();
          const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
          if (fileInput) fileInput.value = '';

          this.step = new Step();
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
        // handle error if needed
      }
    );
  }



  deleteStep(sp_id: number) {
    this.istepService.deleteStep(sp_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.steps = this.steps.filter(s => s.sp_id !== sp_id);
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

  onTabChange(event: MatTabChangeEvent): void {
    const tabLabel = event.tab.textLabel;
    switch (tabLabel) {
      case "Details":
        this.getSubmittedStoryAnswers(this.story.st_id);
        break;
      case "Proggression": break;
      case "Result": break;
    }
  }


  getSubmittedStoryAnswers(st_id: number) {
    this.ianswerService.getSubmittedStoryAnswers(st_id).subscribe(
      (data: any[]) => {
        this.reportDefs = this.dataTableStructure.getDatatableStructure(data);
        this.reportData = data;

        // Use firstDataRendered to auto-size when grid is ready
        const onFirstDataRendered = () => {
          setTimeout(() => {
            this.reportGrid.api.autoSizeAllColumns();
          }, 300); // small delay to ensure rendering completes
          this.reportGrid.api.removeEventListener('firstDataRendered', onFirstDataRendered); // clean up
        };

        this.reportGrid.api.addEventListener('firstDataRendered', onFirstDataRendered);
      },
      (error: any) => {
        if (error.status !== 401) {
          // handle error
        }
      }
    );
  }
  onExport() {
    if (this.reportGrid.api) {
      this.reportGrid.api.exportDataAsCsv
        ({
          fileName: 'Purchase Repoort.csv',
        });
    } else {
      console.warn('Grid API is not available yet.'); // Optional: Handle case when API is not available
    }
  }
  onStartImageSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedStartFile = file ? file : null;
  }
  onEndingImageSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedEndFile = file ? file : null;
  }

  onTrailerFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedTrailerFile = file ? file : null;
  }

  onReplaceStoryAttachmentSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file ? file : null;

    const formData = new FormData();
    formData.append("story", this.story.st_id?.toString() || "0");
    formData.append("type", this.attachmentTabSelected || "");
    formData.append("user", this.currentUser.u_id?.toString() || "0");

    if (this.selectedFile) {
      formData.append("file", this.selectedFile);
    }

    this.istoryService.replaceAttachment(formData).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          this.getStory(this.story.st_id);
          this.selectedStepFile = null;
          const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
          if (fileInput) fileInput.value = '';

          this.snackBarService.showSuccess("Successfully Uploaded");
          setTimeout(() => {
            this.getAttachmentByType(this.story, this.attachmentTabSelected);
          }, 300);

        } else {

          this.snackBarService.showError(data.message);
        }
      },
      (error: any) => {
        // handle error if needed
      }
    );
  }

  setSelect2Values() {
    $("#st_category").val(this.story.st_category).trigger('change');
    $("#st_type").val(this.story.st_type).trigger('change');
  }

  getStory(st_id: number) {
    this.istoryService.getStory(st_id).subscribe(
      (data: Story) => {
        this.story = data;
      },
      (error: any) => {
      }
    );
  }

}
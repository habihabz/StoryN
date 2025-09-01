import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GridService } from '../../services/igrid.service';
import { AgGridAngular } from 'ag-grid-angular';
import { IuserService } from '../../services/iuser.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../services/isnackbar.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { ColDef, DomLayoutType, GridReadyEvent } from 'ag-grid-community';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { IMasterDataService } from '../../services/imaster.data.service';
import { DbResult } from '../../models/dbresult.model';
import { MasterData } from '../../models/master.data.model';
import { RequestParms } from '../../models/requestParms';
import { Client } from '../../models/client.model';
import { IclientService } from '../../services/iclient.service';
import { format } from 'date-fns';
declare var $: any;

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {
  pagination = true;
  paginationPageSize5 = 5;
  paginationPageSizeSelector5 = [5, 10, 20, 50, 100];
  paginationPageSize10 = 10;
  paginationPageSizeSelector10 = [10, 20, 50, 100];
  domLayout: DomLayoutType = 'autoHeight';
  currentUser: User = new User();
  subscription: Subscription = new Subscription();
  clients: Client[] = [];
  client: Client = new Client();
  clientTypes: MasterData[] = [];
  dbResult: DbResult = new DbResult();
  requestParms: RequestParms = new RequestParms();

  @ViewChild('clientsGrid') clientsGrid!: AgGridAngular;

  constructor(
    private iuserService: IuserService,
    private elRef: ElementRef,
    private router: Router,
    private snackBarService: SnackBarService,
    private igridService: GridService,
    private iclientService: IclientService,
    private imasterDataService: IMasterDataService,
  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id === 0) {
      this.router.navigate(['login']);
    }
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "cl_id" },
    { headerName: "Name", field: "cl_name" },
    { headerName: "Type", field: "cl_type_name" },
    { headerName: "Address", field: "cl_address" },
    { headerName: "Email", field: "cl_email" },
    { headerName: "Phone", field: "cl_phone" },
    { headerName: "Active", field: "cl_active_yn" },
    { headerName: "Created By", field: "cl_cre_by_name" },
    {
          headerName: "Created Date",
          field: "cl_cre_date",
          valueFormatter: (params) => {
            return format(new Date(params.value), 'yyyy-MM-dd hh:mm:ss a');
          },
        },
    {
      headerName: 'Edit',
      cellRenderer: 'actionRenderer',
      cellRendererParams: {
        name: 'Edit',
        action: 'onEdit',
        cssClass: 'btn btn-info',
        icon: 'fa fa-edit',
        onEdit: (data: any) => this.onAction('edit', data)
      },
    },
    {
      headerName: 'Delete',
      cellRenderer: 'actionRenderer',
      cellRendererParams: {
        name: 'Delete',
        action: 'onDelete',
        cssClass: 'btn btn-danger',
        icon: 'fa fa-trash',
        onDelete: (data: any) => this.onAction('delete', data)
      },
    }
  ];

  frameworkComponents = {
    actionRenderer: ActionRendererComponent
  };

  defaultColDef = {
    sortable: true,
    filter: true
  };

  ngOnInit(): void {
    this.getClients();
    this.subscription.add(
      this.iclientService.refreshClients$.subscribe(() => {
        this.getClients();
      })
    );
    this.getMasterDatasByType("ClientType", (data) => { this.clientTypes = data; });
  }

  getMasterDatasByType(masterType: string, callback: (data: MasterData[]) => void): void {
    this.requestParms = new RequestParms();
    this.requestParms.type = masterType;
    this.imasterDataService.getMasterDatasByType(this.requestParms).subscribe(
      (data: MasterData[]) => {
        callback(data);
      },
      (error: any) => {
        this.snackBarService.showError('Error fetching master data ' + error);
        callback([]);
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
      default:
        this.snackBarService.showError("Unknown Action " + action);
    }
  }

  onEdit(data: any) {
    this.client = { ...data };
    this.setSelect2Values();
    $('#clientFormModal').modal('show');
  }

  onDelete(data: any) {
    this.iclientService.deleteClient(data.cl_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.clients = this.clients.filter(cl => cl.cl_id !== data.cl_id);
          this.snackBarService.showSuccess("Successfully Removed");
        } else {
          this.snackBarService.showError(result.message);
        }
      },
      (error: any) => {
        console.error('Error deleting client', error);
      }
    );
  }

  getClients() {
    this.iclientService.getClients().subscribe(
      (data: Client[]) => {
        this.clients = data;
        this.igridService.resizeGridColumns(this.clientsGrid.api);
      },
      (error: any) => {
        this.snackBarService.showError("Error fetching clients.");
      }
    );
  }

  onGridReady(event: GridReadyEvent) {
    this.igridService.resizeGridColumns(this.clientsGrid.api);
  }

  openCreateFormModal(): void {
    this.clear();
    $('#clientFormModal').modal('show');
  }

  createOrUpdateClient() {
    this.client.cl_cre_by = this.currentUser.u_id;
    this.iclientService.createOrUpdateClient(this.client).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          this.clear();
          $('#clientFormModal').modal('hide');
          this.iclientService.refreshClients();
          this.snackBarService.showSuccess("Successfully Saved");
        } else {
          this.snackBarService.showError(data.message);
        }
      },
      (error: any) => {
        this.snackBarService.showError(error.message);
      }
    );
  }

  clear() {
    this.client = new Client();
    this.setSelect2Values();
  }

  setSelect2Values() {
    $("#cl_type").val(this.client.cl_type).trigger('change');
  }
  onClientTypeChange(c_id: any) { this.client.cl_type = c_id; }
}

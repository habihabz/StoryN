import { Component, ChangeDetectionStrategy, ElementRef, OnInit, ViewChild } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
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
import { IProductService } from '../../services/iproduct.service';
import { Product } from '../../models/product.model';
import { IMasterDataService } from '../../services/imaster.data.service';
import { ICategoryService } from '../../services/icategory.service';
import { Category } from '../../models/category.model';
import { DbResult } from '../../models/dbresult.model';
import { MasterData } from '../../models/master.data.model';
import { RequestParms } from '../../models/requestParms';
import { ProdSize } from '../../models/prod.size.model';
import { ProdColor } from '../../models/prod.color.model';
import { Barcode } from '../../models/barcode.model';
import { ProdAttachement } from '../../models/prod.attachments.model';
import { environment } from '../../../environments/environment';
import { Room } from '../../models/room.model';
import { IroomService } from '../../services/iroom.service';
import { IclientService } from '../../services/iclient.service';
import { Client } from '../../models/client.model';
import { format } from 'date-fns';
declare var $: any;

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit {
  pagination = true;
  paginationPageSize5 = 5;
  paginationPageSizeSelector5 = [5, 10, 20, 50, 100];
  paginationPageSize10 = 10;
  paginationPageSizeSelector10 = [10, 20, 50, 100];
  domLayout: DomLayoutType = 'autoHeight';
  currentUser: User = new User();
  subscription: Subscription = new Subscription();
  rooms: Room[] = [];
  room: Room = new Room();
  clients: Client[] = [];
  dbResult: DbResult = new DbResult();
  requestParms: RequestParms = new RequestParms();
  today: string = '';


  @ViewChild('roomsGrid') roomsGrid!: AgGridAngular;

  constructor(
    private iuserService: IuserService,
    private elRef: ElementRef,
    private router: Router,
    private icustomerService: ICustomerService,
    private snackBarService: SnackBarService,
    private igridService: GridService,
    private iroomService: IroomService,
    private iclientService: IclientService,
    private imasterDataService: IMasterDataService,
  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id === 0) {
      this.router.navigate(['login']);
    }
  }

  colDefs: ColDef[] = [
    { headerName: "Id", field: "rm_id" },
    { headerName: "Name", field: "rm_name" },
    { headerName: "Code", field: "rm_code" },
    { headerName: "Client", field: "rm_client_name" },
    {
      headerName: "Expire Date",
      field: "rm_expire_date",
      valueFormatter: (params) => {
        return format(new Date(params.value), 'yyyy-MM-dd');
      },
    },
    { headerName: "Created By", field: "rm_cre_by_name" },
    {
      headerName: "Created On",
      field: "rm_cre_date",
      valueFormatter: (params) => {
        return format(new Date(params.value), 'yyyy-MM-dd hh:mm:ss a');
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
    const now = new Date();
    this.today = now.toISOString().split('T')[0];
    this.getClients();
    this.getRooms();
    this.subscription.add(
      this.iroomService.refreshRooms$.subscribe(() => {
        this.getRooms();
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
      default:
        this.snackBarService.showError("Unknown Action " + action);;
    }
  }


  onEdit(data: any) {
    this.room = { ...data };
    this.setSelect2Values();
    $('#roomFormModal').modal('show');
  }

  onDelete(data: any) {
    this.iroomService.deleteRoom(data.rm_id).subscribe(
      (result: DbResult) => {
        if (result.message === "Success") {
          this.rooms = this.rooms.filter(rm => rm.rm_id !== data.rm_id);
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


  getRooms() {
    this.iroomService.getRooms().subscribe(
      (data: Room[]) => {
        this.rooms = data;
        this.igridService.resizeGridColumns(this.roomsGrid.api);
      },
      (error: any) => {
      }
    );
  }

  getClients() {
    this.iclientService.getClients().subscribe(
      (data: Client[]) => {
        this.clients = data;
      },
      (error: any) => {
        this.snackBarService.showError("Error fetching clients.");
      }
    );
  }

  onGridReady(event: GridReadyEvent) {
    this.igridService.resizeGridColumns(this.roomsGrid.api);
  }

  openCreateFormModal(): void {
    this.clear();
    $('#roomFormModal').modal('show');
  }

  createOrUpdateRoom() {
    this.room.rm_cre_by = this.currentUser.u_id;
    this.iroomService.createOrUpdateRoom(this.room).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message === "Success") {
          this.clear();
          $('#roomFormModal').modal('hide');

          this.iroomService.refreshRooms();
          this.snackBarService.showSuccess("Successfully Saved");
        } else {
          this.snackBarService.showError(data.message);
        }
      },
      (error: any) => {
        this.snackBarService.showError("Error occurred while saving the Room.");
      }
    );
  }
  clear() {
    this.room = new Room();
    this.setSelect2Values();
  }

  setSelect2Values() {
    $("#rm_client").val(this.room.rm_client).trigger('change');
  }

  onClientChange(c_id: any) { this.room.rm_client = c_id; }
}

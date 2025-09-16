import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColDef, DomLayoutType, GridReadyEvent, RowClassParams } from 'ag-grid-community';
import { IuserService } from '../../services/iuser.service';
import { IroleService } from '../../services/irole.service';
import { User } from '../../models/user.model';
import { DbResult } from '../../models/dbresult.model';
import { Role } from '../../models/role.model';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RequestParms } from '../../models/requestParms';
import { SnackBarService } from '../../services/isnackbar.service';
import { AgGridAngular } from 'ag-grid-angular';
import { format } from 'date-fns';
import { ActionRendererComponent } from '../../directives/action.renderer';
import { GridService } from '../../services/igrid.service';
import { IErrorLogService } from '../../services/ierror.log.service';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  pageLink:string='users';
  pagination = true;
  paginationPageSize5 = 5;
  paginationPageSizeSelector5 = [5, 10, 20, 50, 100];
  paginationPageSize10 = 10;
  paginationPageSizeSelector10 = [10, 20, 50, 100];
  domLayout: DomLayoutType = 'autoHeight';
  users: User[] = [];
  user: User = new User();
  roles: Role[] = [];
  dbResult: DbResult = new DbResult();
  currentUser: User = new User();
  role: any = 0;
  dtOptions: any = {};
  private subscription: Subscription = new Subscription();
  dtTrigger: Subject<any> = new Subject<any>();
  newpassword: string = '';
  requestParms: RequestParms = new RequestParms();
  @ViewChild('userGrid') userGrid!: AgGridAngular;

  constructor(private iuserService: IuserService,
    private iroleService: IroleService,
    private elRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private snackBarService: SnackBarService,
    private gridService: GridService,
    private ierrorLog : IErrorLogService
  ) {
    this.currentUser = iuserService.getCurrentUser();
    if (this.currentUser.u_id == 0) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.getUsers();
    this.subscription.add(
      this.iuserService.refreshUsers$.subscribe(() => {
        this.getUsers();
      })
    );
    this.loadRoles();
  }



  colDefs: ColDef[] = [
    { headerName: "Id", field: "u_id" },
    { headerName: "Name", field: "u_name" },
    { headerName: "Username", field: "u_username" },
    {
      headerName: 'Password Change', cellRenderer: 'actionRenderer', cellRendererParams:
      {
        name: '', action: 'onPasswordChange', cssClass: 'btn btn-default', icon: 'fa fa-key', onPasswordChange: (data: any) => this.onAction('password', data)
      },
    },
    { headerName: "Role", field: "u_role_name"},
    { headerName: "Email", field: "u_email" },
    { headerName: "Is Admin ??", field: "u_is_admin" },
    { headerName: "Is Active ??", field: "u_active_yn" },
    { headerName: "Created By", field: "u_cre_by_name" },
    {
      headerName: "Created Date",
      field: "u_cre_date",
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

  onAction(action: string, data: any) {
    switch (action) {
      case 'password':
        this.onPasswordChange(data);
        break;
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
  onPasswordChange(data: any) {
    this.iuserService.getUser(data.u_id).subscribe(
      (user: User) => {
        this.user = user;
        $('#passwordResetModal').modal('show');
      },
      (error: any) => {
        console.error('Error fetching user', error);
        this.ierrorLog.createLog(this.pageLink,'getUser',error.message,this.currentUser.u_id);
      }
    );
  }
  onEdit(data: any) {
    this.iuserService.getUser(data.u_id).subscribe(
      (user: User) => {
        this.user = user;
        $("#u_role_id").val(data.u_role_id).trigger('change');
        $('#userFormModal').modal('show');
      },
      (error: any) => {
        this.ierrorLog.createLog(this.pageLink,'getUser',error.message,this.currentUser.u_id);
      }
    );
  }
  onDelete(data: any) {
    this.iuserService.deleteUser(data.u_id).subscribe(
      (dbResult: DbResult) => {
        if (this.dbResult.message === 'Success') {
          this.users = this.users.filter(user => user.u_id !== data.u_id);
          this.userGrid.api.applyTransaction({});
        } else {
          alert(this.dbResult.message);
        }
      },
      (error: any) => {
        this.ierrorLog.createLog(this.pageLink,'deleteUser',error.message,this.currentUser.u_id);
      }
    );
  }

  onGridReady(event: GridReadyEvent) {
    setTimeout(() => {
      this.gridService.adjustGridColumnSizes(this.userGrid.api);
    }, 1000);


  }
  getUsers() {
    this.iuserService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.dtTrigger.next(null);
      },
      (error: any) => {
        this.ierrorLog.createLog(this.pageLink,'getUsers',error.message,this.currentUser.u_id);
      }
    );
  }

  loadRoles() {
    this.iroleService.getRoles().subscribe(
      (data: Role[]) => {
        this.roles = data;
        this.cdr.detectChanges();
      },
      (error: any) => {
        this.ierrorLog.createLog(this.pageLink,'getRoles',error.message,this.currentUser.u_id);
      }
    );
  }

  
  getUser(id: number): void {
    this.iuserService.getUser(id).subscribe(
      (data: User) => {
        this.user = data;
      },
      (error: any) => {
        this.ierrorLog.createLog(this.pageLink,'getUser',error.message,this.currentUser.u_id);
      }
    );
  }

  createOrUpdateUser(): void {
    this.user.u_cre_by = this.currentUser.u_id;
    this.user.u_role_id = this.role;
    this.iuserService.createOrUpdateUser(this.user).subscribe(
      (data: DbResult) => {
        this.dbResult = data;
        if (data.message == "Success") {
          this.iuserService.refreshUsers();
          this.userGrid.api.applyTransaction({});
          this.closeModal();
        } else {
          alert(data.message);
        }
      },
      (error: any) => {
        this.ierrorLog.createLog(this.pageLink,'createOrUpdateUser',error.message,this.currentUser.u_id);
      }
    );
  }

  createUser(): void {
    this.user = new User();
    $('#userFormModal').modal('show');
  }

  closeModal() {
    this.user = new User();
    $('#userFormModal').modal("hide");
  }
  OnRoleChange(r_id: any) {
    this.role = r_id;
  }

  openUpdatePasswordModal(u_id: number) {
    this.iuserService.getUser(u_id).subscribe(
      (data: User) => {
        this.user = data;
        $('#passwordResetModal').modal('show');
      },
      (error: any) => {
        this.ierrorLog.createLog(this.pageLink,'getUser',error.message,this.currentUser.u_id);
      }
    );
  }

  updateUserPassword() {
    if (this.newpassword != '') {
      this.user.u_password = this.newpassword;
      this.user.u_cre_by = this.currentUser.u_id;
      this.iuserService.updateUserPassword(this.user).subscribe(
        (result: DbResult) => {
          if (result.message == "Success") {
            this.user = new User();
            this.newpassword = '';
            $('#passwordResetModal').modal('hide');
            this.snackBarService.showSuccess("Updated Successfully");
          }
          else {
            this.snackBarService.showError("New Password Cannot be Empty !!");
          }

        },
        (error: any) => {
          this.ierrorLog.createLog(this.pageLink,'updateUserPassword',error.message,this.currentUser.u_id);
        }
      );
    } 
  }
}

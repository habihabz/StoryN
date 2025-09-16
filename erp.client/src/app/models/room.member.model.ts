export class RoomMember {
  rmb_id: number;
  rmb_room: number;
  rmb_user: number;
  rmb_user_name: string;
  rmb_is_moderator: string;
  rmb_cre_by: number;
  rmb_cre_by_name: string;
  rmb_cre_date: string;

  constructor() {
    this.rmb_id = 0;
    this.rmb_room = 0,
    this.rmb_user = 0,
    this.rmb_user_name = '';
    this.rmb_is_moderator = 'N';
    this.rmb_cre_by = 0;
    this.rmb_cre_by_name = '';
    this.rmb_cre_date = '';
  }
}

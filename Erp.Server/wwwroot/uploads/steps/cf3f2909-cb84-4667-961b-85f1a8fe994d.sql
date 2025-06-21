update serialnumbers
set sn_sold_on='2025-03-31 21:01:50.597'
where sn_serial_no in ('213934001182',
'214152000373',
'214152000387',
'214152001184',
'213934000006')

update salesorderdetails 
set sd_cre_date='2025-03-31 21:01:50.597'
where sd_serial_no in ('213934001182',
'214152000373',
'214152000387',
'214152001184',
'213934000006')

update salesorders 
set so_cre_date='2025-03-31 21:01:50.597' ,so_posted_date='2025-03-31 21:01:50.597'
where so_id='164'

update movementhistory 
set mh_cre_date='2025-03-31 21:01:50.597'
where mh_serial_no in ('213934001182',
'214152000373',
'214152000387',
'214152001184',
'213934000006') and mh_status='4'


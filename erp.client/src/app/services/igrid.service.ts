import { Injectable } from '@angular/core';
import { GridApi } from 'ag-grid-community'; // Only import GridApi

@Injectable({
  providedIn: 'root',
})
export class GridService {

  resizeGridColumns(gridApi: GridApi): void {
    const gridContainer = document.querySelector('.ag-root'); // Modify the selector if needed
    const gridContainerWidth = gridContainer ? gridContainer.clientWidth : 0;

    // Get all displayed columns
    const allDisplayedColumns = gridApi.getAllDisplayedColumns();

    if (allDisplayedColumns.length && gridContainerWidth) {
      // Resize all displayed columns based on their content
      const allColIds = allDisplayedColumns.map(col => col.getColId());
      gridApi.autoSizeColumns(allColIds);

      // Calculate total width of all columns after auto-sizing
      const totalColumnWidth = allDisplayedColumns.reduce((total, col) => {
        const columnState = gridApi.getColumnState().find(c => c.colId === col.getColId());
        return total + (columnState?.width || 0);
      }, 0);
   
      if (totalColumnWidth < gridContainerWidth) {
        gridApi.sizeColumnsToFit();
      } else {
        // Else, keep auto-sizing all columns
        gridApi.autoSizeColumns(allColIds);
      }
    }
  }

  // Method to auto-size all columns
  autoSizeAllColumns(gridApi: GridApi): void {
    const allColumns = gridApi.getAllDisplayedColumns(); // Get all displayed columns directly from GridApi
    const allColIds = allColumns.map(col => col.getColId());
    gridApi.autoSizeColumns(allColIds);
  }

  adjustGridColumnSizes(gridApi: GridApi) {
    const allColumnIds: string[] = [];
  
    // Use getColumns() to retrieve all columns
    const columnApi = gridApi;
  
    columnApi.getColumns()?.forEach((column: any) => {
      allColumnIds.push(column.getId());
    });
  
    columnApi.autoSizeColumns(allColumnIds);
  }
}

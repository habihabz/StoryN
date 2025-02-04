import { Injectable } from '@angular/core';
import { GridApi } from 'ag-grid-community'; // Only import GridApi

@Injectable({
  providedIn: 'root',
})
export class GridService {
  resizeGridColumns(gridApi: GridApi): void {
    const screenWidth = window.innerWidth;
    const allDisplayedColumns = gridApi.getAllDisplayedColumns();
    let totalColumnWidth = 0;

    if (allDisplayedColumns) {
      allDisplayedColumns.forEach((col) => {
        const colState = gridApi.getColumnState().find((c) => c.colId === col.getColId());
        totalColumnWidth += colState?.width || 0;
      });
    }
    const gridContainer = document.querySelector('.ag-root'); 
    const gridContainerWidth = gridContainer ? gridContainer.clientWidth : 0;

    if (screenWidth < 2000 || totalColumnWidth > gridContainerWidth) {
      gridApi.sizeColumnsToFit();
    } else {
      gridApi.autoSizeAllColumns();
    }
  }
}

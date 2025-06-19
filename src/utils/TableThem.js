export const TABLETHEME = {
  // Common denominator for styling all rows
  BaseRow: `
    font-size: 14px;
    color: var(--table-text-color);
  `,

  // Common denominator for styling all cells
  BaseCell: `
    &:not(:last-of-type) {
      border-right: 1px solid var(--table-border-color);
    }
    padding: 8px 16px;
  `,

  // Styles for header rows
  HeaderRow: `
    background-color: var(--table-header-background-color);
  `,

  // Styles for body rows
  Row: `
    &:hover {
      color: var(--table-hover-text-color);
    }
    cursor: pointer;

    &:nth-child(odd) {
      background-color: var(--table-odd-row-background-color);
    }

    &:nth-child(even) {
      background-color: var(--table-even-row-background-color);
    }
  `,

  // Table grid template columns
  Table: `
    --data-table-library_grid-template-columns: 50px repeat(7, minmax(150px, auto));
  `,
};
# Grocery Shop POS System

A complete Point of Sale (POS) system for grocery stores built with HTML, CSS, and JavaScript. Features local storage for data persistence without requiring a backend server.

## Features

### Product Management
- Add new products with name and price per kilogram
- View all products in an organized list
- Delete products with confirmation
- Automatic data validation and duplicate prevention

### Invoice Creation
- Select products from dropdown menu
- Specify weight for each item
- Real-time total calculation
- Edit item weights after adding
- Remove individual items from invoice
- Clear entire invoice
- Print invoices with formatted layout

### Sales Reporting
- Generate reports for custom date ranges
- Quick filters for today, this week, and this month
- Summary statistics including:
  - Total sales revenue
  - Number of invoices
  - Total weight of items sold
  - Average sale amount
- Product-wise sales breakdown
- Invoice history with detailed view
- Invoice management (view details, delete)

### Data Export
- Export sales reports to CSV format
- Export formatted PDF reports for printing
- Comprehensive data including all invoice details

## Technical Features

- **Local Storage**: All data persists in browser's local storage
- **Responsive Design**: Works on desktop and mobile devices
- **Auto-save**: Current invoice automatically saved every 30 seconds
- **Data Validation**: Input validation for all forms
- **Error Handling**: User-friendly error messages and confirmations

## Getting Started

1. Download the `index.html` file
2. Open it in any modern web browser
3. Start by adding products in the "Manage Products" section
4. Create invoices in the "Create Invoice" section
5. View sales reports in the "Sales Reports" section

## Browser Requirements

- Modern web browser with JavaScript enabled
- Local Storage support (available in all modern browsers)
- For best experience: Chrome, Firefox, Safari, or Edge

## Data Storage

The application uses browser Local Storage to persist data. Data includes:
- Product inventory
- Current invoice items
- Completed invoice history
- Auto-generated IDs for products and invoices

**Note**: Data is stored locally in your browser. Clearing browser data will remove all stored information.

## Usage Instructions

### Adding Products
1. Navigate to "Manage Products" tab
2. Enter product name and price per kilogram
3. Click "Add Product"
4. Product appears in the list below

### Creating Invoices
1. Go to "Create Invoice" tab
2. Select a product from the dropdown
3. Enter the weight in kilograms
4. Click "Add to Invoice"
5. Repeat for all items
6. Review total amount
7. Click "Finalize Invoice" to save
8. Use "Print Invoice" to generate a printable receipt

### Generating Reports
1. Open "Sales Reports" tab
2. Select date range or use quick filters
3. Click "Generate Report"
4. View summary statistics and detailed breakdowns
5. Export data using CSV or PDF options

### Invoice Management
- View invoice details by clicking on any invoice in the history
- Delete invoices using the delete button in the modal
- All changes are automatically saved

## File Structure

```
grocery-pos/
└── index.html          # Complete application in single file
    ├── HTML structure
    ├── CSS styling
    └── JavaScript functionality
```

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Opera 50+

## Security Notes

- All data is stored locally in the browser
- No external servers or APIs are used
- No user authentication required
- Data privacy is maintained as information never leaves the device

## Customization

The system can be easily customized by modifying the HTML file:

- **Styling**: Edit the CSS section for different colors, fonts, or layouts
- **Currency**: Change currency symbols in the JavaScript section
- **Languages**: Modify text content for localization
- **Features**: Add new functionality by extending the JavaScript code

## Sample Data

The application includes optional sample data for demonstration purposes. Uncomment the `loadSampleData()` function call at the bottom of the script to populate the system with example products and invoices.

## Troubleshooting

### Data Not Saving
- Ensure JavaScript is enabled in your browser
- Check if Local Storage is available and not disabled
- Verify you're not in private/incognito browsing mode

### Print Function Not Working
- Check browser's print settings
- Ensure pop-ups are allowed for the page
- Try using a different browser if issues persist

### Display Issues
- Clear browser cache and reload the page
- Ensure you're using a supported browser version
- Check for JavaScript errors in browser console

## Development

This is a client-side only application that requires no build process or dependencies. To modify:

1. Open `index.html` in a text editor
2. Make changes to HTML, CSS, or JavaScript sections
3. Save and refresh in browser to see changes

## Limitations

- Data is limited by browser's Local Storage capacity (typically 5-10MB)
- No backup or sync functionality
- Single-user system (no multi-user support)
- No network connectivity features
- Limited to browser environment

## License

This project is released into the public domain. Feel free to use, modify, and distribute as needed.

## Support

For issues or questions:
1. Check browser console for error messages
2. Verify browser compatibility
3. Clear browser data and try again
4. Ensure JavaScript is enabled

## Future Enhancements

Potential improvements that could be added:
- Multi-store support
- Barcode scanning integration
- Customer management
- Inventory tracking
- Tax calculations
- Discount management
- Receipt customization
- Data backup/restore functionality
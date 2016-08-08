<?php
$key = "Getting Started ng1";
$pageTitle = "Best AngularJS Grid";
$pageDescription = "Explains how to set up the Best AngularJS Grid grid, ag-Grid, inside your browser.";
$pageKeyboards = "Best AngularJS Grid Datagrid";
include '../documentation_header.php';
?>

<div>

    <h2>Getting Started - AngularJS 1.x</h2>

    <p>
        The ag-Grid script, when loaded, will check if AngularJS is loaded. If it finds it,
        it will register the grid as an AngularJS 1.x Directive. All you need to do is make sure you
        load AngularJS before you load ag-Grid, and then load ag-Grid before you initialise
        your AngularJS module.
    </p>

    <h4>Creating the AngularJS Module</h4>
    Include ag-Grid as a dependency of your module like this:
    <p/>
    <pre><code>var module = angular.module("example", <b>["agGrid"]</b>);</code></pre>

    <h4>ag-Grid Div</h4>

    <p>
        To include a grid in your html, add the ag-Grid attribute to a div. The value
        of the div should be the provided grid options on the scope.
    </p>

    <p>
        It is also usual (although not necessary) to provide a styling theme to
        the grid. Three themes come with the grid, ag-fresh, ag-dark and ag-blue. Each one is
        set by applying the corresponding class of the same name to the div. In the
        example, ag-fresh is used.
    </p>

    <p>
        You must provide <b>width and height</b> to your grid. The grid is programmed to fill
        the width and height you give it.
    </p>

    <pre>&lt;div <b>ag-grid="gridOptions" class="ag-fresh" style="height: 100%;"</b>>&lt;/div></pre>

    <p>
        (note: a div by default has 100% width, so the width is not specified explicitly above).
    </p>

    <h4>Grid Options</h4>
    <p>
        The grid options provide ag-Grid with the details needed to render. At a
        minimum you provide the columns (columnDefs) and the rows (rowData).
    </p>

    <h2>Basic AngularJS 1.x Example</h2>
    <show-example example="example1" example-height="200px"></show-example>

    <h2>Advanced AngularJS 1.x Example</h2>

    <p>
        The below example has much more details. The mechanism for setting up the grid
        is the same as above. Don't worry about the finer details for now, how all the
        different options are configured is explained in the relevant parts of the documentation.
    </p>

    <show-example example="basic"></show-example>

    <h2>Further Example Starting Point</h2>

    <p>
        Below is another simple example, but it loads rows instead of creating rows on the fly.
        This example is used as as starting point for most of the further examples in the
        documentation.
    </p>

    <p>
        The rows are loaded after the grid is initialised, so the grid's API is used to
        update the rows into the grid. The API is explained in full in it's own section
        within the documentation.
    </p>

    <pre><code>$scope.gridOptions.api.setRowData(newRows)</code></pre>

    <show-example example="example2"></show-example>

    <h2>Angular Compiling</h2>

    <p>
        Angular 1.x was great. It allows us to build large end-to-end single page web apps with relative ease.
        However the author of ag-Grid is of the opinion that not everything should be
        built in Angular. Angular 1.x does come with a disadvantage, it can slow things down.
        ag-Grid does not use Angular 1.x (or any other framework) underneath the hood, it is all
        blazing fast raw Javascript.
    </p>
    <p>
        But maybe you are not worried about performance. Maybe you are not displaying
        that many rows and columns. And maybe you want to provide your own cell renderers
        and use Angular here. For whatever reason, it is possible to turn Angular on for
        Angular version 1.x (not for version Angular 2).
    </p>
    <p>
        When Angular is turned on in ag-Grid, every time a row is inserted, a new child
        Angular Scope is created for that row. This scope gets the row attached to it
        so it's available to any Angular logic inside the cell.
    </p>
    <p>
        Each cell within the row does not get a new child scope. So if placing item inside the
        child scope for the row, be aware that it is shared across all cells for that row.
        If you want a cell to have it's own private scope, consider using a directive
        for the renderer that will introduce a new scope.
    </p>

    <h4>Turn On Angular Compile</h4>
    <p>
        Angular compiling is turned on by setting the grid options attribute angularCompileRows to true.
    </p>

    <ul>
        <li><b>angularCompileRows:</b> Whether to compile the rows for Angular.</li>
        <li><b>angularCompileFilters:</b> Whether to compile provided custom filters.</li>
        <li><b>angularCompileHeaders:</b> Whether to compile the customer headers for AngularJS.</li>
    </ul>

    <p>The default is always to have Angular compiling off for performance reasons.</p>

    <h4>Example using Angular Compile</h4>

    <p>
        Below then uses three columns rendered using custom Angular renderers.
    </p>
    <ul>
        <li><b>Athlete:</b> Uses simple binding to display text.</li>
        <li><b>Age:</b> Uses simple binding to display a button, with a button click event using ng-click.</li>
        <li><b>Country:</b> Uses a custom Angular directive to display the country.</li>
    </ul>

    <show-example example="exampleAngularCompiling"></show-example>

    <note>
        When scrolling the example above up and down, the cells rendered using Angular are blank
        initially, and filled in during the next Angular digest cycle. This behaviour the author
        has observed in other Angular grid implementations. This is another reason why the author
        prefers non-Angular rendering for large grids.
    </note>

    <h2>Destroy</h2>

    <p>
        You do not need to manually clean up the grid. The grid ties in with the AngularJS 1 lifecycle
        and releases all resources when the directive is destroyed.
    </p>

    <h2>Next Steps...</h2>

    <p>
        Now you can go to <a href="../javascript-grid-interfacing-overview/index.php">interfacing</a>
        to learn about accessing all the features of the grid.
    </p>

</div>

<?php include '../documentation_footer.php';?>

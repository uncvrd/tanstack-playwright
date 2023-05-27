import Image from "next/image";
import { Inter } from "next/font/google";
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    createColumnHelper,
    flexRender,
    Table as ReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

interface AddressDataTableToolbarProps {
    // comment out this line
    table: ReactTable<TableItem>;
    onClick: (show: boolean) => void;
}

// remove table as parameter
function AddressDataTableToolbar({ onClick, table }: AddressDataTableToolbarProps) {
    // comment out this line
    const isFiltered = table.getPreFilteredRowModel().rows.length > table.getFilteredRowModel().rows.length;

    return (
        <div className="flex items-center justify-between">
            <button className="ml-auto hidden h-8 lg:flex" data-testid="create-address-button" onClick={() => onClick(true)}>
                Create Address
            </button>
        </div>
    );
}

interface TableItem {
    name: string;
}

const tableHelper = createColumnHelper<TableItem>();

const columns = [
    tableHelper.accessor("name", {
        header: ({ column }) => <div>Name</div>,
        cell: ({ getValue }) => <div>{getValue()}</div>,
    }),
];

export default function Home() {
    const [showDiv, setShowDiv] = useState(false);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data: [],
        columns,
        state: {
            sorting,
            columnVisibility,
            columnFilters,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <>
            <div className="space-y-4">
                <AddressDataTableToolbar
                    // comment out this line
                    table={table}
                    onClick={(show) => {
                        setShowDiv(show);
                    }}
                />
            </div>
            {!!showDiv && <div data-testid="displayed-div">Displaying Div</div>}
        </>
    );
}

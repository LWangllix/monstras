import orderBy from "lodash/orderBy";
import get from "lodash/get";

import keys from 'all-object-keys';
export interface Pagination {
    filter?: any,
    pagination?: {
        page: number,
        perPage: number,
    },
    sort?: {
        field: string,
        order: string
    }
}

const slice = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
}
export const paginate = (data: Array<any>, pagination: Pagination = {
    pagination: { page: 1, perPage: 10 },
    sort: {
        field: "id",
        order: "ASC"
    }
}, filterFunction?: (data: any) => boolean) => {
    const { page, perPage } = pagination.pagination;
    const filter = pagination.filter;
    const order = pagination.sort.order.toLowerCase();
    const field = pagination.sort.field;

    const filteredData = filter ? data.filter(d => {
        return keys(filter).every(k => {
            const filterValue = get(filter, k);
            if (!filterValue) {
                return true;
            }
            const search = `${filterValue}`;
            if (search.length === 0) {
                return true;
            }
            const value = get(d, k, "");

            return (value || "").toLowerCase().includes(search.toLowerCase());
        })
    }) : data;
    //@ts-ignore
    const orderedData = orderBy(filteredData, [field], [order]);
    const _data = slice(orderedData, perPage, page);
    return {
        total: filteredData.length,
        data: _data
    }
}

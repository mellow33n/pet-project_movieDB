import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";


export default function MoviesPagination({ count, page, changePage }) {
    return (
      <Stack spacing={2}>
        <Pagination
          count={count || 0}
          page={page}
          onChange={changePage}
          color="primary"
        />
      </Stack>
    );
}

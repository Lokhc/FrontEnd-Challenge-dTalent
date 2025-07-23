import { useState } from "react";

function usefilters() {
    const [order, setOrder] = useState(null);
    const [filter, setFilter] = useState({});
    const [subFilter, setSubFilter] = useState();
}
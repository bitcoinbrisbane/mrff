import React, { useState, useRef, useEffect, useCallback } from "react";

const SearchFilter = ({
  data,
  delay = 0,
  setFiltered: _setFiltered,
  ...props
}) => {
  const [search, setSearch] = useState("");
  const timer = useRef(null);
  const setFiltered = useCallback(_setFiltered);

  const filter = (search, data) => {
    if (!search || !data) return data;
    const pattern = new RegExp(search, "i");
    return data.filter(row =>
      Object.values(row).some(col => JSON.stringify(col).match(pattern))
    );
  };

  useEffect(() => {
    setFiltered(data);
  }, [data, setFiltered]);

  const handleChange = e => {
    const { value } = e.target;
    setSearch(value);

    if (timer.current) window.clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      setFiltered(filter(value, data));
    }, delay);
  };
  return (
    <input type="text" onChange={handleChange} value={search} {...props} />
  );
};

export default SearchFilter;

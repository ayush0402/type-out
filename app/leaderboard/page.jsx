"use client";

import React from "react";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const page = () => {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const { data, error } = await supabase.from("session_data").select("*");
      if (error) throw error;
      if (data) {
        setproducts(data);
      }
    } catch (err) {
      alert(err);
    }
  }
  products.sort((a, b) => (a.highest_wpm > b.highest_wpm ? -1 : 1));
  return (
    <div>
      <Table data={products}></Table>
    </div>
  );
};

export default page;

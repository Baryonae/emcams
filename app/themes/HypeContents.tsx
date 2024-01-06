import React, { useState, useEffect } from "react";
import supabase from "./client";
import { useSearchParams } from "next/navigation";

interface Type {
  postHeadings: any[];
}

function HypeContents(data: Type) {
  const [postHeadings, setPostHeadings] = useState<any[] | null>(null);
  const searchParams = useSearchParams();
  const magazineToken = searchParams.get("magazineToken");

  useEffect(() => {
    async function getHeadings() {
      const { data: headings } = await supabase
        .from("posts")
        .select("postHeading")
        .eq("magazineToken", magazineToken);
      if (headings) {
        setPostHeadings(headings);
      }
    }

    getHeadings();
  }, [magazineToken]);

  return (
    <div>
      {postHeadings?.map((heading, index) => (
        <div key={index}>{heading.postHeading}</div>
      ))}
    </div>
  );
}

export default HypeContents;

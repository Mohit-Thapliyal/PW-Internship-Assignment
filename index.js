// Selecting the Input Button
let folder = document.getElementById("input_folder");

// function for formating the size
function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// ---- function for sorting in ascending order based on file name ----
const sortByName = (arr) => {
  const sorter = (a, b) => {
    return a["new_name"].localeCompare(b["new_name"]);
  };
  arr.sort(sorter);
};

//  onChange event listner
folder.addEventListener("change", () => {
  // Initialising files
  var raw_files = [];
  var new_files = [];
  // Storing files entered by user
  raw_files = folder.files;
  // Creating new files array triming unnecessary data
  for (let i = 0; i < raw_files.length; i++) {
    new_files.push({
      name: raw_files[i]["name"],
      new_name:
        raw_files[i]["name"].substring(
          0,
          raw_files[i]["name"].lastIndexOf(".")
        ) || raw_files[i]["name"],
      size: formatBytes(raw_files[i]["size"]),
      type: raw_files[i]["type"],
      lastModifiedDate: raw_files[i]["lastModifiedDate"],
    });
  }
  //   Sorting the array
  sortByName(new_files);

  //  ---- Table Creation and Handling ----
  //   selecting a div for inserting the table
  const table_container = document.getElementById("table_content");
  //   removing the table before uploading new folder
  if (table_container.hasChildNodes()) {
    table_container.removeChild(table_container.children[0]);
  }
  // Creating the table
  const tbl = document.createElement("table");
  tbl.classList.add("styled-table");
  //   Creating Head Section
  const tableHead = tbl.createTHead();
  const head_Row = tableHead.insertRow();
  let first = head_Row.insertCell();
  first.appendChild(document.createTextNode("Name"));
  first.style.border = "1px solid black";
  let second = head_Row.insertCell();
  second.appendChild(document.createTextNode("Size"));
  second.style.border = "1px solid black";
  let third = head_Row.insertCell();
  third.appendChild(document.createTextNode("Info"));
  third.style.border = "1px solid black";
  // Creating the body section
  const table_body = tbl.createTBody();
  //  --- Rows and Column Insertion ---
  for (let i = 0; i < new_files.length; i++) {
    // Inserting Row
    const tr = table_body.insertRow();
    for (key in new_files[i]) {
      // Inserting Column
      if (key === "type") {
        // Creating tool-tip
        const td = tr.insertCell();
        const info_tooltip = document.createElement("a");
        const link = document.createTextNode("hover");
        info_tooltip.appendChild(link);
        info_tooltip.dataHtml = true;
        info_tooltip.title = `${new_files[i]["name"]} ${new_files[i]["size"]} ${new_files[i]["type"]} ${new_files[i]["lastModifiedDate"]}`;
        info_tooltip.style.cursor = "pointer";
        td.appendChild(info_tooltip);
      } else if (key === "new_name" || key === "size") {
        const td = tr.insertCell();
        td.appendChild(document.createTextNode(`${new_files[i][key]}`));
      }
    }
  }
  //   Appending table to the respective div
  table_container.appendChild(tbl);
});
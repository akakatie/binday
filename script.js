let dataset = [];
let app_tk = "EjR05TdsgjM2adw3UIt1E5o1w"
let statecheck = 0;

function setLeftWidth() {
  const leftDiv = document.getElementById("left");
  const windowWidth = window.innerWidth;

  // decide fraction based on screen width
  let fraction = windowWidth < 800 ? 1/3 : 1/2;

  // calculate target width
  let targetWidth = Math.floor((windowWidth * fraction) / 50) * 50;

  leftDiv.style.width = `${targetWidth}px`;
}

// call on load
setLeftWidth();

// update on resize
window.addEventListener("resize", setLeftWidth);

    async function fetchData() {
      const url = "https://www.data.act.gov.au/resource/jzzy-44un.json";
      const params = new URLSearchParams({
        "$limit": 5000,
        "$$app_token": app_tk
      });

      try {
        const response = await fetch(`${url}?${params.toString()}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        dataset = await response.json();

        const suburbFromUrl = getUrlParam("suburb");
        const result = getBinNext(suburbFromUrl);

        document.getElementById("bin_name").textContent =
          `${result.bin_colour.toUpperCase()}`;
        
        var suburb = result.suburb
        suburb = suburb.charAt(0) + suburb.substring(1).toLowerCase();

        document.getElementById("suburb-name").textContent = suburb;

        if (result.bin_colour == "yellow"){
            document.body.style.backgroundColor = "#ffcc00";
            statecheck = 2;
        }
        if (result.bin_colour == "green"){
            document.body.style.backgroundColor = "#468e56";
            statecheck = 1;
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("bin-name").textContent = "Who knows? Not me!";
      }
    }

    // Get a query param from the URL
    function getUrlParam(name) {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    }

    // Case-insensitive suburb match, fallback to random
    function getBinNext(suburbName) {
      if (!dataset || dataset.length === 0) {
        return { suburb: null, bin_colour: null };
      }

      let match = null;

      if (suburbName) {
        match = dataset.find(
          d => d.suburb && d.suburb.toUpperCase() === suburbName.toUpperCase()
        );
      }

      if (!match) {
        match = dataset[Math.floor(Math.random() * dataset.length)];
      }

function parseDateDMY(str) {
  const [day, month, year] = str.split("/").map(Number);
  return new Date(year, month - 1, day); // JS months are 0-indexed
}

// convert strings to dates
var greenwasteDate = parseDateDMY(match.next_greenwaste_date);
var recyclingDate = parseDateDMY(match.recycling_pickup_date);


// now you can compare
if (greenwasteDate < recyclingDate) {
        bin_next = "green";
        console.log()
      } else {
        bin_next = "yellow";
      }

      return {
        suburb: match.suburb,
        bin_colour: bin_next
      };
    }

    fetchData();
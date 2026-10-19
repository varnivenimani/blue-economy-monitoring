import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";


/* =========================
   MAP MARKER ICON
========================= */

const markerIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize: [25, 41],

  iconAnchor: [12, 41],

  popupAnchor: [1, -34],

  shadowSize: [41, 41]
});


function App() {

  const [activeSection, setActiveSection] =
    useState("dashboard");


  /* =========================
     DATA
  ========================= */

  const [fisheries, setFisheries] = useState([]);

  const [marineResources, setMarineResources] =
    useState([]);

  const [industries, setIndustries] =
    useState([]);

  const [indicators, setIndicators] =
    useState([]);


  /* =========================
     SEARCH
  ========================= */

  const [searchText, setSearchText] =
    useState("");

  const currentYear = new Date().getFullYear();

  const [yearFilter, setYearFilter] =
    useState(String(currentYear));

  const [comparisonFromYear, setComparisonFromYear] =
    useState(String(currentYear - 1));

  const [comparisonToYear, setComparisonToYear] =
    useState(String(currentYear));


  /* =========================
     FISHERIES FORM
  ========================= */

  const [species, setSpecies] =
    useState("");

  const [fishLocation, setFishLocation] =
    useState("");

  const [production, setProduction] =
    useState("");

  const [fishYear, setFishYear] =
    useState("");


  /* =========================
     MARINE RESOURCE FORM
  ========================= */

  const [resourceName, setResourceName] =
    useState("");

  const [resourceLocation, setResourceLocation] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [resourceYear, setResourceYear] =
    useState("");


  /* =========================
     INDUSTRY FORM
  ========================= */

  const [industryName, setIndustryName] =
    useState("");

  const [industryLocation, setIndustryLocation] =
    useState("");

  const [revenue, setRevenue] =
    useState("");

  const [industryYear, setIndustryYear] =
    useState("");


  /* =========================
     ECONOMIC FORM
  ========================= */

  const [indicatorName, setIndicatorName] =
    useState("");

  const [indicatorValue, setIndicatorValue] =
    useState("");

  const [unit, setUnit] =
    useState("");

  const [indicatorYear, setIndicatorYear] =
    useState("");

  /* =========================
     EDIT RECORD
  ========================= */

  const [editingRecord, setEditingRecord] = useState(null);
  const [editType, setEditType] = useState("");
  const [editForm, setEditForm] = useState({});


  /* =========================
     LOAD DATA
  ========================= */

  const loadData = () => {

    fetch(
      "http://localhost:5000/api/fisheries"
    )
      .then((res) => res.json())
      .then((data) => setFisheries(data))
      .catch((error) =>
        console.log(error)
      );


    fetch(
      "http://localhost:5000/api/marine-resources"
    )
      .then((res) => res.json())
      .then((data) =>
        setMarineResources(data)
      )
      .catch((error) =>
        console.log(error)
      );


    fetch(
      "http://localhost:5000/api/coastal-industries"
    )
      .then((res) => res.json())
      .then((data) =>
        setIndustries(data)
      )
      .catch((error) =>
        console.log(error)
      );


    fetch(
      "http://localhost:5000/api/economic-indicators"
    )
      .then((res) => res.json())
      .then((data) =>
        setIndicators(data)
      )
      .catch((error) =>
        console.log(error)
      );
  };


  useEffect(() => {

    loadData();

  }, []);


  /* =========================
     ADD FISHERIES
  ========================= */

  const addFisheries = async (e) => {
    e.preventDefault();

    if (!species.trim()) {
      alert("Please enter the species name.");
      return;
    }

    if (!fishLocation.trim()) {
      alert("Please enter the location.");
      return;
    }

    if (production === "" || Number(production) < 0) {
      alert("Production must be a valid non-negative number.");
      return;
    }

    if (fishYear === "" || Number(fishYear) < 1900 || Number(fishYear) > 2100) {
      alert("Please enter a valid year between 1900 and 2100.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/fisheries",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            species: species.trim(),
            location: fishLocation.trim(),
            production: Number(production),
            year: Number(fishYear)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add fisheries record.");
      }

      setSpecies("");
      setFishLocation("");
      setProduction("");
      setFishYear("");
      loadData();
    } catch (error) {
      alert(error.message);
    }
  };


  /* =========================
     ADD MARINE RESOURCE
  ========================= */

  const addMarineResource = async (e) => {
    e.preventDefault();

    if (!resourceName.trim()) {
      alert("Please enter the resource name.");
      return;
    }

    if (!resourceLocation.trim()) {
      alert("Please enter the location.");
      return;
    }

    if (quantity === "" || Number(quantity) < 0) {
      alert("Quantity must be a valid non-negative number.");
      return;
    }

    if (resourceYear === "" || Number(resourceYear) < 1900 || Number(resourceYear) > 2100) {
      alert("Please enter a valid year between 1900 and 2100.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/marine-resources",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            resourceName: resourceName.trim(),
            location: resourceLocation.trim(),
            quantity: Number(quantity),
            year: Number(resourceYear)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add marine resource record.");
      }

      setResourceName("");
      setResourceLocation("");
      setQuantity("");
      setResourceYear("");
      loadData();
    } catch (error) {
      alert(error.message);
    }
  };


  /* =========================
     ADD INDUSTRY
  ========================= */

  const addIndustry = async (e) => {
    e.preventDefault();

    if (!industryName.trim()) {
      alert("Please enter the industry name.");
      return;
    }

    if (!industryLocation.trim()) {
      alert("Please enter the location.");
      return;
    }

    if (revenue === "" || Number(revenue) < 0) {
      alert("Revenue must be a valid non-negative number.");
      return;
    }

    if (industryYear === "" || Number(industryYear) < 1900 || Number(industryYear) > 2100) {
      alert("Please enter a valid year between 1900 and 2100.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/coastal-industries",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            industryName: industryName.trim(),
            location: industryLocation.trim(),
            revenue: Number(revenue),
            year: Number(industryYear)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add coastal industry record.");
      }

      setIndustryName("");
      setIndustryLocation("");
      setRevenue("");
      setIndustryYear("");
      loadData();
    } catch (error) {
      alert(error.message);
    }
  };


  /* =========================
     ADD ECONOMIC INDICATOR
  ========================= */

  const addIndicator = async (e) => {
    e.preventDefault();

    if (!indicatorName.trim()) {
      alert("Please enter the indicator name.");
      return;
    }

    if (indicatorValue === "" || Number(indicatorValue) < 0) {
      alert("Value must be a valid non-negative number.");
      return;
    }

    if (!unit.trim()) {
      alert("Please enter the unit.");
      return;
    }

    if (indicatorYear === "" || Number(indicatorYear) < 1900 || Number(indicatorYear) > 2100) {
      alert("Please enter a valid year between 1900 and 2100.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/economic-indicators",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            indicatorName: indicatorName.trim(),
            value: Number(indicatorValue),
            unit: unit.trim(),
            year: Number(indicatorYear)
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to add economic indicator record.");
      }

      setIndicatorName("");
      setIndicatorValue("");
      setUnit("");
      setIndicatorYear("");
      loadData();
    } catch (error) {
      alert(error.message);
    }
  };


  /* =========================
     DELETE
  ========================= */

  const deleteFisheries = (id) => {
    if (!window.confirm("Are you sure you want to delete this fisheries record?")) return;
    fetch(`http://localhost:5000/api/fisheries/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Unable to delete fisheries record.");
        loadData();
      })
      .catch((error) => alert(error.message));
  };

  const deleteMarineResource = (id) => {
    if (!window.confirm("Are you sure you want to delete this marine resource record?")) return;
    fetch(`http://localhost:5000/api/marine-resources/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Unable to delete marine resource record.");
        loadData();
      })
      .catch((error) => alert(error.message));
  };

  const deleteIndustry = (id) => {
    if (!window.confirm("Are you sure you want to delete this coastal industry record?")) return;
    fetch(`http://localhost:5000/api/coastal-industries/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Unable to delete coastal industry record.");
        loadData();
      })
      .catch((error) => alert(error.message));
  };

  const deleteIndicator = (id) => {
    if (!window.confirm("Are you sure you want to delete this economic indicator record?")) return;
    fetch(`http://localhost:5000/api/economic-indicators/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Unable to delete economic indicator record.");
        loadData();
      })
      .catch((error) => alert(error.message));
  };


  /* =========================
     EDIT / UPDATE
  ========================= */

  const openEdit = (type, item) => {
    setEditType(type);
    setEditingRecord(item);
    if (type === "fisheries") setEditForm({ species: item.species || "", location: item.location || "", production: item.production ?? "", year: item.year ?? "" });
    else if (type === "marine") setEditForm({ resourceName: item.resourceName || "", location: item.location || "", quantity: item.quantity ?? "", year: item.year ?? "" });
    else if (type === "industries") setEditForm({ industryName: item.industryName || "", location: item.location || "", revenue: item.revenue ?? "", year: item.year ?? "" });
    else setEditForm({ indicatorName: item.indicatorName || "", value: item.value ?? "", unit: item.unit || "", year: item.year ?? "" });
  };

  const closeEdit = () => { setEditingRecord(null); setEditType(""); setEditForm({}); };

  const updateRecord = async (e) => {
    e.preventDefault();

    const year = Number(editForm.year);

    if (!Number.isInteger(year) || year < 1900 || year > 2100) {
      alert("Please enter a valid year between 1900 and 2100.");
      return;
    }

    const numericFields = {
      fisheries: "production",
      marine: "quantity",
      industries: "revenue",
      economy: "value"
    };

    const numericField = numericFields[editType];
    const numericValue = Number(editForm[numericField]);

    if (!Number.isFinite(numericValue) || numericValue < 0) {
      alert("Please enter a valid non-negative number.");
      return;
    }

    const requiredTextFields =
      editType === "fisheries"
        ? ["species", "location"]
        : editType === "marine"
          ? ["resourceName", "location"]
          : editType === "industries"
            ? ["industryName", "location"]
            : ["indicatorName", "unit"];

    for (const field of requiredTextFields) {
      if (!String(editForm[field] || "").trim()) {
        alert("Please fill in all required text fields.");
        return;
      }
    }

    const endpoints = {
      fisheries: "fisheries",
      marine: "marine-resources",
      industries: "coastal-industries",
      economy: "economic-indicators"
    };

    const body = {
      ...editForm,
      year,
      [numericField]: numericValue
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/${endpoints[editType]}/${editingRecord._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      const errorData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          errorData.message || "Unable to update record."
        );
      }

      closeEdit();
      loadData();
    } catch (error) {
      alert(error.message);
    }
  };


  /* =========================
     YEAR DATA
  ========================= */

  const years = Array.from(
    new Set([
      ...fisheries.map((x) => Number(x.year)),
      ...marineResources.map((x) => Number(x.year)),
      ...industries.map((x) => Number(x.year)),
      ...indicators.map((x) => Number(x.year))
    ].filter((x) => !Number.isNaN(x)))
  ).sort((a, b) => a - b);

  const availableYears = Array.from(
    new Set([currentYear, ...years])
  ).sort((a, b) => b - a);

  const selectedYear = Number(yearFilter);

  const selectedFisheries = fisheries.filter(
    (item) => Number(item.year) === selectedYear
  );

  const selectedMarineResources = marineResources.filter(
    (item) => Number(item.year) === selectedYear
  );

  const selectedIndustries = industries.filter(
    (item) => Number(item.year) === selectedYear
  );

  const selectedIndicators = indicators.filter(
    (item) => Number(item.year) === selectedYear
  );


  /* =========================
     TOTALS FOR SELECTED YEAR
  ========================= */

  const totalProduction = selectedFisheries.reduce(
    (total, item) => total + Number(item.production || 0),
    0
  );

  const totalMarineQuantity = selectedMarineResources.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const totalRevenue = selectedIndustries.reduce(
    (total, item) => total + Number(item.revenue || 0),
    0
  );

  const averageIndicator = selectedIndicators.length > 0
    ? (selectedIndicators.reduce(
        (total, item) => total + Number(item.value || 0),
        0
      ) / selectedIndicators.length).toFixed(2)
    : 0;


  /* =========================
     ALERTS FOR SELECTED YEAR
  ========================= */

  const fisheriesAlerts = selectedFisheries.filter(
    (item) => Number(item.production) < 1000
  );

  const marineAlerts = selectedMarineResources.filter(
    (item) => Number(item.quantity) < 2000
  );

  const industryAlerts = selectedIndustries.filter(
    (item) => Number(item.revenue) < 5000
  );

  const economicAlerts = selectedIndicators.filter(
    (item) => Number(item.value) < 5
  );

  const totalAlerts =
    fisheriesAlerts.length +
    marineAlerts.length +
    industryAlerts.length +
    economicAlerts.length;


  /* =========================
     RESOURCE HEALTH + INSIGHTS
  ========================= */

  const getHealthStatus = (type, item) => {
    const rules = {
      fisheries: ["production", 1000],
      marine: ["quantity", 2000],
      industries: ["revenue", 5000],
      economy: ["value", 5]
    };

    const [field, threshold] = rules[type];
    const value = Number(item[field] || 0);

    if (value < threshold) {
      return { label: "Critical", className: "health-critical", icon: "🔴" };
    }

    if (value < threshold * 1.5) {
      return { label: "Warning", className: "health-warning", icon: "🟡" };
    }

    return { label: "Normal", className: "health-normal", icon: "🟢" };
  };


  /* =========================
     YEAR-OVER-YEAR COMPARISON
  ========================= */

  const fromYear = Number(comparisonFromYear);
  const toYear = Number(comparisonToYear);

  const sumByYear = (data, field, year) => {
    const records = data.filter(
      (item) => Number(item.year) === Number(year)
    );

    if (records.length === 0) return null;

    return records.reduce(
      (total, item) => total + Number(item[field] || 0),
      0
    );
  };

  const pctChange = (current, previous) => {
    if (current === null || previous === null) return null;

    if (previous === 0) {
      return current === 0 ? 0 : 100;
    }

    return ((current - previous) / Math.abs(previous)) * 100;
  };

  const yearComparison = [
    {
      label: "Fish Production",
      previous: sumByYear(fisheries, "production", fromYear),
      current: sumByYear(fisheries, "production", toYear)
    },
    {
      label: "Marine Quantity",
      previous: sumByYear(marineResources, "quantity", fromYear),
      current: sumByYear(marineResources, "quantity", toYear)
    },
    {
      label: "Industry Revenue",
      previous: sumByYear(industries, "revenue", fromYear),
      current: sumByYear(industries, "revenue", toYear)
    },
    {
      label: "Economic Indicators",
      previous: sumByYear(indicators, "value", fromYear),
      current: sumByYear(indicators, "value", toYear)
    }
  ].map((item) => ({
    ...item,
    change: pctChange(item.current, item.previous)
  }));


  const keyInsights = [];

  if (selectedFisheries.length) {
    const x = [...selectedFisheries].sort(
      (a, b) => Number(b.production) - Number(a.production)
    )[0];

    keyInsights.push({
      icon: "🐟",
      title: "Highest Fish Production",
      text: `${x.species} recorded ${Number(x.production).toLocaleString()} units at ${x.location}.`
    });
  }

  if (selectedMarineResources.length) {
    const x = [...selectedMarineResources].sort(
      (a, b) => Number(a.quantity) - Number(b.quantity)
    )[0];

    keyInsights.push({
      icon: "🌊",
      title: "Resource Requiring Attention",
      text: `${x.resourceName} has the lowest recorded quantity at ${Number(x.quantity).toLocaleString()} units.`
    });
  }

  if (selectedIndustries.length) {
    const x = [...selectedIndustries].sort(
      (a, b) => Number(b.revenue) - Number(a.revenue)
    )[0];

    keyInsights.push({
      icon: "🏭",
      title: "Leading Coastal Industry",
      text: `${x.industryName} has the highest recorded revenue of ₹${Number(x.revenue).toLocaleString()}.`
    });
  }

  keyInsights.push(
    totalAlerts
      ? {
          icon: "⚠️",
          title: "Monitoring Attention",
          text: `${totalAlerts} record${totalAlerts === 1 ? "" : "s"} crossed the current threshold in ${selectedYear}.`
        }
      : {
          icon: "✅",
          title: "Monitoring Condition",
          text: `No records in ${selectedYear} cross the predefined monitoring thresholds.`
        }
  );


  /* =========================
     SEARCH
  ========================= */

  const matchesSearch = (
    values
  ) => {

    const text =
      values
        .join(" ")
        .toLowerCase();

    return text.includes(
      searchText.toLowerCase()
    );
  };


  /* =========================
     FILTERED DATA
  ========================= */

  const filteredFisheries = selectedFisheries.filter((item) =>
    matchesSearch([
      item.species,
      item.location,
      item.production,
      item.year
    ])
  );

  const filteredMarineResources = selectedMarineResources.filter((item) =>
    matchesSearch([
      item.resourceName,
      item.location,
      item.quantity,
      item.year
    ])
  );

  const filteredIndustries = selectedIndustries.filter((item) =>
    matchesSearch([
      item.industryName,
      item.location,
      item.revenue,
      item.year
    ])
  );

  const filteredIndicators = selectedIndicators.filter((item) =>
    matchesSearch([
      item.indicatorName,
      item.value,
      item.unit,
      item.year
    ])
  );


  /* =========================
     ANALYTICS CHART DATA - LATEST 2 YEARS
  ========================= */

  const chartYears = availableYears
    .filter((year) => years.includes(Number(year)))
    .slice(0, 2)
    .sort((a, b) => a - b);

  const buildYearChartData = (data, field) =>
    chartYears.map((year) => {
      const records = data.filter((item) => Number(item.year) === Number(year));
      return {
        year,
        value: records.length
          ? records.reduce((sum, item) => sum + Number(item[field] || 0), 0)
          : null
      };
    });

  const fisheriesChartData = buildYearChartData(fisheries, "production");
  const marineChartData = buildYearChartData(marineResources, "quantity");
  const industryChartData = buildYearChartData(industries, "revenue");
  const indicatorChartData = buildYearChartData(indicators, "value");

  const chartHasData = (data) => data.some((item) => item.value !== null);


  /* =========================
     EXPORT GOVERNMENT REPORT
  ========================= */

  const csvEscape = (value) =>
    `"${String(value ?? "").replace(/"/g, '""')}"`;

  const exportReport = () => {
    const rows = [
      ["BLUE ECONOMY MONITORING SYSTEM", "Government Monitoring Report"],
      ["Generated On", new Date().toLocaleString()],
      ["Selected Year", selectedYear],
      [],
      ["EXECUTIVE SUMMARY"],
      ["Fisheries Records", selectedFisheries.length],
      ["Marine Resource Records", selectedMarineResources.length],
      ["Coastal Industry Records", selectedIndustries.length],
      ["Economic Indicator Records", selectedIndicators.length],
      ["Monitoring Alerts", totalAlerts],
      [],
      ["YEAR COMPARISON"],
      ["From Year", fromYear],
      ["To Year", toYear],
      ["Metric", "From Value", "To Value", "Change %"],
      ...yearComparison.map((x) => [
        x.label,
        x.previous === null ? "No data available" : x.previous,
        x.current === null ? "No data available" : x.current,
        x.change === null ? "No comparison" : x.change.toFixed(2)
      ]),
      [],
      ["KEY INSIGHTS"],
      ...keyInsights.map((x) => [x.title, x.text]),
      [],
      ["FISHERIES"],
      ["Species", "Location", "Production", "Year", "Health Status"],
      ...selectedFisheries.map((x) => [
        x.species, x.location, x.production, x.year,
        getHealthStatus("fisheries", x).label
      ]),
      [],
      ["MARINE RESOURCES"],
      ["Resource Name", "Location", "Quantity", "Year", "Health Status"],
      ...selectedMarineResources.map((x) => [
        x.resourceName, x.location, x.quantity, x.year,
        getHealthStatus("marine", x).label
      ]),
      [],
      ["COASTAL INDUSTRIES"],
      ["Industry Name", "Location", "Revenue", "Year", "Health Status"],
      ...selectedIndustries.map((x) => [
        x.industryName, x.location, x.revenue, x.year,
        getHealthStatus("industries", x).label
      ]),
      [],
      ["ECONOMIC INDICATORS"],
      ["Indicator Name", "Value", "Unit", "Year", "Health Status"],
      ...selectedIndicators.map((x) => [
        x.indicatorName, x.value, x.unit, x.year,
        getHealthStatus("economy", x).label
      ])
    ];

    const csv = rows
      .map((row) => row.map(csvEscape).join(","))
      .join("\n");

    const blob = new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `blue_economy_${selectedYear}_report.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };


  /* =========================
     INDIA COASTAL LOCATIONS
  ========================= */

  const coastalLocations = [

    {
      name: "Gujarat Coast",
      lat: 22.3,
      lng: 70.8
    },

    {
      name: "Maharashtra Coast",
      lat: 19.0,
      lng: 73.0
    },

    {
      name: "Goa Coast",
      lat: 15.4,
      lng: 73.9
    },

    {
      name: "Karnataka Coast",
      lat: 14.5,
      lng: 74.5
    },

    {
      name: "Kerala Coast",
      lat: 10.5,
      lng: 76.2
    },

    {
      name: "Chennai Coast",
      lat: 13.08,
      lng: 80.27
    },

    {
      name: "Andhra Pradesh Coast",
      lat: 16.5,
      lng: 81.5
    },

    {
      name: "Odisha Coast",
      lat: 19.8,
      lng: 85.8
    },

    {
      name: "West Bengal Coast",
      lat: 21.6,
      lng: 88.0
    }

  ];


  /* =========================
     LOCATION DATA
  ========================= */

  const getLocationData =
    (locationName) => {

      const searchLocation =
        locationName
          .replace(" Coast", "")
          .toLowerCase();


      const fishData =
        fisheries.filter(
          (item) =>
            Number(item.year) === selectedYear &&
            item.location
              ?.toLowerCase()
              .includes(
                searchLocation
              )
        );


      const marineData =
        marineResources.filter(
          (item) =>
            Number(item.year) === selectedYear &&
            item.location
              ?.toLowerCase()
              .includes(
                searchLocation
              )
        );


      const industryData =
        industries.filter(
          (item) =>
            Number(item.year) === selectedYear &&
            item.location
              ?.toLowerCase()
              .includes(
                searchLocation
              )
        );


      const economicData =
        indicators.filter(
          (item) =>
            Number(item.year) === selectedYear &&
            item.indicatorName
              ?.toLowerCase()
              .includes(
                searchLocation
              )
        );


      const locationAlerts =
        fishData.filter(
          (item) =>
            Number(item.production) <
            1000
        ).length +

        marineData.filter(
          (item) =>
            Number(item.quantity) <
            2000
        ).length +

        industryData.filter(
          (item) =>
            Number(item.revenue) <
            5000
        ).length;


      const fishProduction =
        fishData.reduce(
          (total, item) =>
            total +
            Number(item.production),
          0
        );


      const marineQuantity =
        marineData.reduce(
          (total, item) =>
            total +
            Number(item.quantity),
          0
        );


      const industryRevenue =
        industryData.reduce(
          (total, item) =>
            total +
            Number(item.revenue),
          0
        );


      return {

        fishData,

        marineData,

        industryData,

        economicData,

        locationAlerts,

        fishProduction,

        marineQuantity,

        industryRevenue

      };
    };


  /* =========================
     SIDEBAR BUTTON
  ========================= */

  const menuButton =
    (
      section,
      title
    ) => (

      <button

        className={
          activeSection === section
            ? "menu active"
            : "menu"
        }

        onClick={() => {

          setActiveSection(section);

          setSearchText("");

          setYearFilter(String(currentYear));

        }}

      >

        {title}

      </button>

    );


  return (

    <div className="app">


      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">


        <div className="sidebar-logo">

          <div className="logo-icon">
            🌊
          </div>


          <div>

            <h2>
              Blue Economy
            </h2>

            <p>
              Government Monitoring
            </p>

          </div>

        </div>


        <nav>

          {menuButton(
            "dashboard",
            "Dashboard"
          )}

          {menuButton(
            "officer",
            "Government Officer"
          )}

          {menuButton(
            "fisheries",
            "Fisheries"
          )}

          {menuButton(
            "marine",
            "Marine Resources"
          )}

          {menuButton(
            "industries",
            "Coastal Industries"
          )}

          {menuButton(
            "economy",
            "Economic Indicators"
          )}

          {menuButton(
            "alerts",
            "Monitoring Alerts"
          )}

          {menuButton(
            "analytics",
            "Analytics"
          )}

        </nav>


        <div className="sidebar-footer">

          <span>●</span>

          System Online

        </div>

      </aside>


      {/* =========================
          MAIN
      ========================= */}

      <main className="main">


        <header>

          <div>

            <h1>
              Blue Economy Monitoring System
            </h1>

            <p>
              Centralized monitoring platform
              for marine resources, fisheries,
              coastal industries and economic
              indicators.
            </p>

          </div>


          <div className="header-status">

            <span>●</span>

            System Active

          </div>

        </header>


        {/* =========================
            DASHBOARD
        ========================= */}

        {activeSection === "dashboard" && (
          <section>
            <div className="dashboard-hero">
              <div>
                <div className="dashboard-kicker">GOVERNMENT MONITORING PORTAL</div>
                <h2>Blue Economy Dashboard</h2>
                <p>
                  Real-time overview of marine resources, fisheries, coastal
                  industries and economic indicators.
                </p>
              </div>

              <div className="dashboard-controls">
                <label className="year-control-label">
                  Monitoring Year
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                  >
                    {availableYears.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </label>
                <button className="export-btn dashboard-export" onClick={exportReport}>
                  ↓ Export Report
                </button>
              </div>
            </div>

            <div className="dashboard-year-note">
              Showing dashboard data for <strong>{selectedYear}</strong>.
              Analytics charts below compare the latest two available years.
            </div>

            <div className="cards">
              <div className="card"><h3>Fisheries</h3><strong>{selectedFisheries.length}</strong><p>Records in {selectedYear}</p></div>
              <div className="card"><h3>Marine Resources</h3><strong>{selectedMarineResources.length}</strong><p>Records in {selectedYear}</p></div>
              <div className="card"><h3>Coastal Industries</h3><strong>{selectedIndustries.length}</strong><p>Records in {selectedYear}</p></div>
              <div className="card"><h3>Economic Indicators</h3><strong>{selectedIndicators.length}</strong><p>Records in {selectedYear}</p></div>
            </div>

            <div className="analytics">
              <div className="analytics-card"><h3>Total Fish Production</h3><strong>{selectedFisheries.length ? totalProduction : "No data"}</strong><p>Recorded production</p></div>
              <div className="analytics-card"><h3>Marine Resource Quantity</h3><strong>{selectedMarineResources.length ? totalMarineQuantity : "No data"}</strong><p>Recorded quantity</p></div>
              <div className="analytics-card"><h3>Total Industry Revenue</h3><strong>{selectedIndustries.length ? `₹${totalRevenue.toLocaleString()}` : "No data"}</strong><p>Recorded revenue</p></div>
              <div className="analytics-card"><h3>Monitoring Alerts</h3><strong>{totalAlerts}</strong><p>{totalAlerts ? "Requires attention" : "No active alerts"}</p></div>
            </div>

            <div className="dashboard-grid">
              <div className="panel">
                <h2>System Status</h2>
                <div className="status-list">
                  <div className="status-item"><div><strong>Fisheries Monitoring</strong><p>Production data</p></div><span className="status-normal">Active</span></div>
                  <div className="status-item"><div><strong>Marine Resources</strong><p>Resource quantity</p></div><span className="status-normal">Active</span></div>
                  <div className="status-item"><div><strong>Coastal Industries</strong><p>Industry revenue</p></div><span className="status-normal">Active</span></div>
                  <div className="status-item"><div><strong>Economic Indicators</strong><p>Economic performance</p></div><span className="status-normal">Active</span></div>
                </div>
              </div>

              <div className="panel">
                <div className="section-title-row">
                  <div><h2>Year-over-Year Comparison</h2><p>Compare any two years.</p></div>
                  <div className="comparison-selectors">
                    <label>From Year<select value={comparisonFromYear} onChange={(e) => setComparisonFromYear(e.target.value)}>{availableYears.map((year) => <option key={year} value={year}>{year}</option>)}</select></label>
                    <span>→</span>
                    <label>To Year<select value={comparisonToYear} onChange={(e) => setComparisonToYear(e.target.value)}>{availableYears.map((year) => <option key={year} value={year}>{year}</option>)}</select></label>
                  </div>
                </div>
                <div className="comparison-list">
                  {yearComparison.map((item) => (
                    <div className="comparison-item" key={item.label}>
                      <div><strong>{item.label}</strong><p>{fromYear}: {item.previous === null ? "No data available" : Number(item.previous).toLocaleString()} &nbsp; | &nbsp; {toYear}: {item.current === null ? "No data available" : Number(item.current).toLocaleString()}</p></div>
                      <span className={item.change === null ? "change-neutral" : item.change >= 0 ? "change-positive" : "change-negative"}>
                        {item.change === null ? "No comparison" : `${item.change >= 0 ? "▲" : "▼"} ${Math.abs(item.change).toFixed(1)}%`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel">
              <h2>Monitoring Summary</h2>
              <div className="summary-number">{totalAlerts}</div>
              <p className="summary-text">
                {totalAlerts === 0
                  ? `No active monitoring alerts for ${selectedYear}.`
                  : `${totalAlerts} record${totalAlerts === 1 ? "" : "s"} require attention in ${selectedYear}.`}
              </p>
              <button className="view-alert-btn" onClick={() => setActiveSection("alerts")}>View Monitoring Alerts</button>
            </div>
          </section>
        )}

        {/* =========================
            GOVERNMENT OFFICER
        ========================= */}

        {activeSection === "officer" && (

          <section>


            <div className="section-heading">

              <div>

                <h2>
                  Government Officer Panel
                </h2>

                <p>
                  Centralized control view for
                  monitoring blue economy
                  activities.
                </p>

              </div>


              <button
                className="export-btn"
                onClick={
                  exportReport
                }
              >
                ↓ Export Report
              </button>

            </div>


            <div className="officer-cards">





              <div className="officer-card">

                <span className="officer-icon">
                  ⚠
                </span>

                <div>

                  <h3>
                    Active Alerts
                  </h3>

                  <strong>
                    {totalAlerts}
                  </strong>

                </div>

              </div>


              <div className="officer-card">

                <span className="officer-icon">
                  📍
                </span>

                <div>

                  <h3>
                    Monitoring Areas
                  </h3>

                  <strong>
                    {coastalLocations.length}
                  </strong>

                </div>

              </div>




            </div>


            <div className="panel">

              <h2>
                Officer Responsibilities
              </h2>


              <div className="responsibility-grid">


                <div className="responsibility">

                  <span>01</span>

                  <div>

                    <strong>
                      Monitor Data
                    </strong>

                    <p>
                      Review fisheries,
                      marine resource,
                      industry and
                      economic records.
                    </p>

                  </div>

                </div>


                <div className="responsibility">

                  <span>02</span>

                  <div>

                    <strong>
                      Identify Alerts
                    </strong>

                    <p>
                      Check values that
                      cross predefined
                      monitoring thresholds.
                    </p>

                  </div>

                </div>


                <div className="responsibility">

                  <span>03</span>

                  <div>

                    <strong>
                      Analyze Trends
                    </strong>

                    <p>
                      Use charts and
                      statistics to understand
                      recorded information.
                    </p>

                  </div>

                </div>


                <div className="responsibility">

                  <span>04</span>

                  <div>

                    <strong>
                      Generate Reports
                    </strong>

                    <p>
                      Export collected
                      information for
                      documentation.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            <div className="panel">

              <h2>
                Officer Monitoring Summary
              </h2>


              <div className="officer-table">


                <div className="officer-row officer-header">

                  <span>
                    Module
                  </span>

                  <span>
                    Records
                  </span>

                  <span>
                    Status
                  </span>

                </div>


                <div className="officer-row">

                  <span>
                    Fisheries
                  </span>

                  <span>
                    {fisheries.length}
                  </span>

                  <span className="status-normal">
                    Active
                  </span>

                </div>


                <div className="officer-row">

                  <span>
                    Marine Resources
                  </span>

                  <span>
                    {marineResources.length}
                  </span>

                  <span className="status-normal">
                    Active
                  </span>

                </div>


                <div className="officer-row">

                  <span>
                    Coastal Industries
                  </span>

                  <span>
                    {industries.length}
                  </span>

                  <span className="status-normal">
                    Active
                  </span>

                </div>


                <div className="officer-row">

                  <span>
                    Economic Indicators
                  </span>

                  <span>
                    {indicators.length}
                  </span>

                  <span className="status-normal">
                    Active
                  </span>

                </div>

              </div>

            </div>

          </section>

        )}


        {/* =========================
            SEARCH BAR
        ========================= */}

        {(activeSection === "fisheries" ||
          activeSection === "marine" ||
          activeSection === "industries" ||
          activeSection === "economy") && (

          <div className="filter-bar">


            <input

              type="text"

              placeholder="Search records..."

              value={searchText}

              onChange={(e) =>
                setSearchText(
                  e.target.value
                )
              }

            />


            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>


            <button

              className="clear-btn"

              onClick={() => {

                setSearchText("");

                setYearFilter(String(currentYear));

              }}

            >
              Clear
            </button>

          </div>

        )}


        {/* =========================
            FISHERIES
        ========================= */}

        {activeSection === "fisheries" && (

          <section className="panel">


            <div className="section-title-row">

              <div>

                <h2>
                  Fisheries Monitoring
                </h2>

                <p>
                  Monitor fish species and
                  production information.
                </p>

              </div>


              <span className="record-count">

                {filteredFisheries.length}
                {" "}Records

              </span>

            </div>


            <form
              onSubmit={addFisheries}
              className="data-form"
            >

              <input

                type="text"

                placeholder="Species"

                value={species}

                onChange={(e) =>
                  setSpecies(
                    e.target.value
                  )
                }

                required

              />


              <input

                type="text"

                placeholder="Location"

                value={fishLocation}

                onChange={(e) =>
                  setFishLocation(
                    e.target.value
                  )
                }

                required

              />


              <input

                type="number"

                placeholder="Production"

                value={production}

                onChange={(e) =>
                  setProduction(
                    e.target.value
                  )
                }

                required

              />


              <input

                type="number"

                placeholder="Year"

                value={fishYear}

                onChange={(e) =>
                  setFishYear(
                    e.target.value
                  )
                }

                required

              />


              <button type="submit">
                + Add Fisheries Record
              </button>

            </form>


            {filteredFisheries.length === 0 ? (

              <p className="empty">
                No matching fisheries
                records found.
              </p>

            ) : (

              filteredFisheries.map(
                (item) => (

                  <div
                    className="record"
                    key={item._id}
                  >

                    <span>
                      {item.species}
                    </span>

                    <span>
                      {item.location}
                    </span>

                    <span>
                      {item.production} units
                    </span>

                    <span>
                      {item.year}
                    </span>

                    <span className={`health-badge ${getHealthStatus("fisheries", item).className}`}>
                      {getHealthStatus("fisheries", item).icon} {getHealthStatus("fisheries", item).label}
                    </span>

                    <button
                      className="edit-btn"
                      onClick={() => openEdit("fisheries", item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteFisheries(
                          item._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                )
              )

            )}

          </section>

        )}


        {/* =========================
            MARINE RESOURCES
        ========================= */}

        {activeSection === "marine" && (

          <section className="panel">


            <div className="section-title-row">

              <div>

                <h2>
                  Marine Resources
                </h2>

                <p>
                  Monitor marine resource
                  availability and quantity.
                </p>

              </div>


              <span className="record-count">

                {filteredMarineResources.length}
                {" "}Records

              </span>

            </div>


            <form
              onSubmit={
                addMarineResource
              }
              className="data-form"
            >

              <input

                type="text"

                placeholder="Resource Name"

                value={resourceName}

                onChange={(e) =>
                  setResourceName(
                    e.target.value
                  )
                }

                required

              />


              <input

                type="text"

                placeholder="Location"

                value={resourceLocation}

                onChange={(e) =>
                  setResourceLocation(
                    e.target.value
                  )
                }

                required

              />


              <input

                type="number"

                placeholder="Quantity"

                value={quantity}

                onChange={(e) =>
                  setQuantity(
                    e.target.value
                  )
                }

                required

              />


              <input

                type="number"

                placeholder="Year"

                value={resourceYear}

                onChange={(e) =>
                  setResourceYear(
                    e.target.value
                  )
                }

                required

              />


              <button type="submit">
                + Add Marine Resource
              </button>

            </form>


            {filteredMarineResources.length === 0 ? (

              <p className="empty">
                No matching marine
                resource records found.
              </p>

            ) : (

              filteredMarineResources.map(
                (item) => (

                  <div
                    className="record"
                    key={item._id}
                  >

                    <span>
                      {item.resourceName}
                    </span>

                    <span>
                      {item.location}
                    </span>

                    <span>
                      {item.quantity} units
                    </span>

                    <span>
                      {item.year}
                    </span>

                    <span className={`health-badge ${getHealthStatus("marine", item).className}`}>
                      {getHealthStatus("marine", item).icon} {getHealthStatus("marine", item).label}
                    </span>

                    <button
                      className="edit-btn"
                      onClick={() => openEdit("marine", item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteMarineResource(
                          item._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                )
              )

            )}

          </section>

        )}


        {/* =========================
            COASTAL INDUSTRIES
        ========================= */}

        {activeSection === "industries" && (

          <section className="panel">


            <div className="section-title-row">

              <div>

                <h2>
                  Coastal Industries
                </h2>

                <p>
                  Monitor coastal industry
                  activities and revenue.
                </p>

              </div>


              <span className="record-count">

                {filteredIndustries.length}
                {" "}Records

              </span>

            </div>


            <form
              onSubmit={addIndustry}
              className="data-form"
            >

              <input

                type="text"

                placeholder="Industry Name"

                value={industryName}

                onChange={(e) =>
                  setIndustryName(
                    e.target.value
                  )
                }

                required

              />


              <input

                type="text"

                placeholder="Location"

                value={industryLocation}

                onChange={(e) =>
                  setIndustryLocation(
                    e.target.value
                  )
                }

                required

              />


              <input

                type="number"

                placeholder="Revenue"

                value={revenue}

                onChange={(e) =>
                  setRevenue(
                    e.target.value
                  )
                }

                required

              />


              <input

                type="number"

                placeholder="Year"

                value={industryYear}

                onChange={(e) =>
                  setIndustryYear(
                    e.target.value
                  )
                }

                required

              />


              <button type="submit">
                + Add Coastal Industry
              </button>

            </form>


            {filteredIndustries.length === 0 ? (

              <p className="empty">
                No matching coastal industry
                records found.
              </p>

            ) : (

              filteredIndustries.map(
                (item) => (

                  <div
                    className="record"
                    key={item._id}
                  >

                    <span>
                      {item.industryName}
                    </span>

                    <span>
                      {item.location}
                    </span>

                    <span>
                      ₹{item.revenue}
                    </span>

                    <span>
                      {item.year}
                    </span>

                    <span className={`health-badge ${getHealthStatus("industries", item).className}`}>
                      {getHealthStatus("industries", item).icon} {getHealthStatus("industries", item).label}
                    </span>

                    <button
                      className="edit-btn"
                      onClick={() => openEdit("industries", item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteIndustry(
                          item._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                )
              )

            )}

          </section>

        )}


        {/* =========================
            ECONOMIC INDICATORS
        ========================= */}

        {activeSection === "economy" && (

          <section className="panel">


            <div className="section-title-row">

              <div>

                <h2>
                  Economic Indicators
                </h2>

                <p>
                  Monitor economic performance
                  related to the blue economy.
                </p>

              </div>


              <span className="record-count">

                {filteredIndicators.length}
                {" "}Records

              </span>

            </div>


            <form
              onSubmit={
                addIndicator
              }
              className="data-form"
            >

              <input

                type="text"

                placeholder="Indicator Name"

                value={indicatorName}

                onChange={(e) =>
                  setIndicatorName(
                    e.target.value
                  )
                }

                required

              />


              <input

                type="number"

                placeholder="Value"

                value={indicatorValue}

                onChange={(e) =>
                  setIndicatorValue(
                    e.target.value
                  )
                }

                required

              />


              <input

                type="text"

                placeholder="Unit"

                value={unit}

                onChange={(e) =>
                  setUnit(
                    e.target.value
                  )
                }

                required

              />


              <input

                type="number"

                placeholder="Year"

                value={indicatorYear}

                onChange={(e) =>
                  setIndicatorYear(
                    e.target.value
                  )
                }

                required

              />


              <button type="submit">
                + Add Economic Indicator
              </button>

            </form>


            {filteredIndicators.length === 0 ? (

              <p className="empty">
                No matching economic
                indicator records found.
              </p>

            ) : (

              filteredIndicators.map(
                (item) => (

                  <div
                    className="record"
                    key={item._id}
                  >

                    <span>
                      {item.indicatorName}
                    </span>

                    <span>
                      {item.value}
                    </span>

                    <span>
                      {item.unit}
                    </span>

                    <span>
                      {item.year}
                    </span>

                    <span className={`health-badge ${getHealthStatus("economy", item).className}`}>
                      {getHealthStatus("economy", item).icon} {getHealthStatus("economy", item).label}
                    </span>

                    <button
                      className="edit-btn"
                      onClick={() => openEdit("economy", item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteIndicator(
                          item._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                )
              )

            )}

          </section>

        )}


        {/* =========================
            ALERTS
        ========================= */}

        {activeSection === "alerts" && (

          <section>


            <div className="section-heading">

              <div>

                <h2>
                  Monitoring Alerts
                </h2>

                <p>
                  Values requiring monitoring
                  based on predefined
                  thresholds.
                </p>

              </div>

            </div>


            <div className="alert-summary">


              <div className="alert-summary-card">

                <strong>
                  {totalAlerts}
                </strong>

                <span>
                  Total Alerts
                </span>

              </div>


              <div className="alert-summary-card">

                <strong>
                  {fisheriesAlerts.length}
                </strong>

                <span>
                  Fisheries
                </span>

              </div>


              <div className="alert-summary-card">

                <strong>
                  {marineAlerts.length}
                </strong>

                <span>
                  Marine Resources
                </span>

              </div>


              <div className="alert-summary-card">

                <strong>
                  {industryAlerts.length}
                </strong>

                <span>
                  Industries
                </span>

              </div>


              <div className="alert-summary-card">

                <strong>
                  {economicAlerts.length}
                </strong>

                <span>
                  Economic
                </span>

              </div>

            </div>


            <div className="alerts">


              {fisheriesAlerts.map(
                (item) => (

                  <div
                    className="alert-card warning"
                    key={item._id}
                  >

                    <div>

                      <strong>
                        Fisheries Monitoring
                      </strong>

                      <p>
                        Low production
                        detected for{" "}
                        <b>
                          {item.species}
                        </b>{" "}
                        at{" "}
                        {item.location}.
                        Current value:{" "}
                        {item.production}.
                      </p>

                    </div>

                    <span>
                      MONITOR
                    </span>

                  </div>

                )
              )}


              {marineAlerts.map(
                (item) => (

                  <div
                    className="alert-card warning"
                    key={item._id}
                  >

                    <div>

                      <strong>
                        Marine Resource
                        Monitoring
                      </strong>

                      <p>
                        Low quantity detected
                        for{" "}
                        <b>
                          {item.resourceName}
                        </b>.
                        Current value:{" "}
                        {item.quantity}.
                      </p>

                    </div>

                    <span>
                      MONITOR
                    </span>

                  </div>

                )
              )}


              {industryAlerts.map(
                (item) => (

                  <div
                    className="alert-card warning"
                    key={item._id}
                  >

                    <div>

                      <strong>
                        Coastal Industry
                        Monitoring
                      </strong>

                      <p>
                        Low revenue detected
                        for{" "}
                        <b>
                          {item.industryName}
                        </b>.
                        Current value: ₹
                        {item.revenue}.
                      </p>

                    </div>

                    <span>
                      MONITOR
                    </span>

                  </div>

                )
              )}


              {economicAlerts.map(
                (item) => (

                  <div
                    className="alert-card danger"
                    key={item._id}
                  >

                    <div>

                      <strong>
                        Economic Indicator
                        Alert
                      </strong>

                      <p>
                        Low value detected
                        for{" "}
                        <b>
                          {item.indicatorName}
                        </b>.
                        Current value:{" "}
                        {item.value}{" "}
                        {item.unit}.
                      </p>

                    </div>

                    <span>
                      ALERT
                    </span>

                  </div>

                )
              )}


              {totalAlerts === 0 && (

                <div className="no-alert">

                  <div className="success-icon">
                    ✓
                  </div>

                  <div>

                    <strong>
                      No Active Monitoring
                      Alerts
                    </strong>

                    <p>
                      All monitored values
                      are currently within
                      the predefined
                      thresholds.
                    </p>

                  </div>

                </div>

              )}

            </div>

          </section>

        )}


        {/* =========================
            ANALYTICS
        ========================= */}

        {activeSection === "analytics" && (
          <section>
            <div className="section-heading">
              <div>
                <h2>Data Analytics</h2>
                <p>Two-year comparison of recorded blue economy data.</p>
              </div>
              <div className="analytics-period">
                {chartYears.length === 2
                  ? `${chartYears[0]} → ${chartYears[1]}`
                  : chartYears.length === 1
                    ? `${chartYears[0]} → No data available`
                    : "No data available"}
              </div>
            </div>

            <div className="charts">
              <div className="chart-card">
                <h3>Fisheries Production</h3>
                {chartHasData(fisheriesChartData) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={fisheriesChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Production" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="chart-empty">No data available for the two-year range.</div>
                )}
              </div>

              <div className="chart-card">
                <h3>Marine Resource Quantity</h3>
                {chartHasData(marineChartData) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={marineChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Quantity" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="chart-empty">No data available for the two-year range.</div>
                )}
              </div>

              <div className="chart-card">
                <h3>Coastal Industry Revenue</h3>
                {chartHasData(industryChartData) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={industryChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" name="Revenue" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="chart-empty">No data available for the two-year range.</div>
                )}
              </div>

              <div className="chart-card">
                <h3>Economic Indicators</h3>
                {chartHasData(indicatorChartData) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={indicatorChartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" name="Indicator Value" strokeWidth={3} connectNulls={false} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="chart-empty">No data available for the two-year range.</div>
                )}
              </div>
            </div>

            {/* =========================
                INDIA MAP
            ========================= */}

            <div className="panel map-panel">


              <div className="section-title-row">

                <div>

                  <h2>
                    India Coastal Monitoring
                  </h2>

                  <p>
                    Click a coastal location
                    to view its monitoring data.
                  </p>

                </div>

              </div>


              <div className="india-map">


                <MapContainer

                  center={[
                    20.5,
                    78.9
                  ]}

                  zoom={5}

                  scrollWheelZoom={true}

                  style={{
                    height: "500px",
                    width: "100%"
                  }}

                >


                  <TileLayer

                    attribution='&copy; OpenStreetMap contributors'

                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                  />


                  {coastalLocations.map(
                    (location) => {

                      const data =
                        getLocationData(
                          location.name
                        );


                      return (

                        <Marker

                          key={
                            location.name
                          }

                          position={[
                            location.lat,
                            location.lng
                          ]}

                          icon={
                            markerIcon
                          }

                        >

                          <Popup>

                            <div className="map-popup">


                              <h3>{location.name}</h3>
                              <div className={`map-health ${data.locationAlerts > 0 ? "health-warning" : "health-normal"}`}>{data.locationAlerts > 0 ? "🟡 Attention Required" : "🟢 Monitoring Normal"}</div>

                              <div className="popup-stat">

                                <span>
                                  🐟 Fisheries
                                </span>

                                <strong>
                                  {
                                    data
                                      .fishData
                                      .length
                                  }
                                </strong>

                              </div>


                              <div className="popup-stat">

                                <span>
                                  🌊 Marine Resources
                                </span>

                                <strong>
                                  {
                                    data
                                      .marineData
                                      .length
                                  }
                                </strong>

                              </div>


                              <div className="popup-stat">

                                <span>
                                  🏭 Industries
                                </span>

                                <strong>
                                  {
                                    data
                                      .industryData
                                      .length
                                  }
                                </strong>

                              </div>


                              <div className="popup-stat">

                                <span>
                                  ⚠️ Alerts
                                </span>

                                <strong>
                                  {
                                    data
                                      .locationAlerts
                                  }
                                </strong>

                              </div>


                              <hr />
                              <div className="popup-highlight">
                                <div><span>Total Fish Production</span><strong>{data.fishProduction.toLocaleString()}</strong></div>
                                <div><span>Marine Quantity</span><strong>{data.marineQuantity.toLocaleString()}</strong></div>
                                <div><span>Industry Revenue</span><strong>₹{data.industryRevenue.toLocaleString()}</strong></div>
                              </div>

                              {data.fishData.length >
                                0 && (

                                <p>

                                  <b>
                                    Fish Production:
                                  </b>{" "}

                                  {
                                    data
                                      .fishProduction
                                  }

                                </p>

                              )}


                              {data.marineData.length >
                                0 && (

                                <p>

                                  <b>
                                    Marine Quantity:
                                  </b>{" "}

                                  {
                                    data
                                      .marineQuantity
                                  }

                                </p>

                              )}


                              {data.industryData.length >
                                0 && (

                                <p>

                                  <b>
                                    Industry Revenue:
                                  </b>{" "}

                                  ₹
                                  {
                                    data
                                      .industryRevenue
                                  }

                                </p>

                              )}


                              {data.fishData.length ===
                                0 &&

                                data.marineData.length ===
                                  0 &&

                                data.industryData.length ===
                                  0 && (

                                  <p className="no-location-data">

                                    No database
                                    records available
                                    for this location.

                                  </p>

                                )}

                            </div>

                          </Popup>

                        </Marker>

                      );

                    }
                  )}

                </MapContainer>

              </div>

            </div>

          </section>

        )}

      </main>

      {editingRecord && (
        <div className="edit-modal-backdrop" onClick={closeEdit}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="edit-modal-header"><div><span className="dashboard-eyebrow">RECORD MANAGEMENT</span><h2>Edit {editType === "fisheries" ? "Fisheries" : editType === "marine" ? "Marine Resource" : editType === "industries" ? "Coastal Industry" : "Economic Indicator"}</h2></div><button className="modal-close" onClick={closeEdit}>×</button></div>
            <form className="edit-form" onSubmit={updateRecord}>
              {editType === "fisheries" && <><input required placeholder="Species" value={editForm.species || ""} onChange={(e) => setEditForm({ ...editForm, species: e.target.value })}/><input required placeholder="Location" value={editForm.location || ""} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}/><input required type="number" placeholder="Production" value={editForm.production ?? ""} onChange={(e) => setEditForm({ ...editForm, production: e.target.value })}/><input required type="number" placeholder="Year" value={editForm.year ?? ""} onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}/></>}
              {editType === "marine" && <><input required placeholder="Resource Name" value={editForm.resourceName || ""} onChange={(e) => setEditForm({ ...editForm, resourceName: e.target.value })}/><input required placeholder="Location" value={editForm.location || ""} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}/><input required type="number" placeholder="Quantity" value={editForm.quantity ?? ""} onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })}/><input required type="number" placeholder="Year" value={editForm.year ?? ""} onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}/></>}
              {editType === "industries" && <><input required placeholder="Industry Name" value={editForm.industryName || ""} onChange={(e) => setEditForm({ ...editForm, industryName: e.target.value })}/><input required placeholder="Location" value={editForm.location || ""} onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}/><input required type="number" placeholder="Revenue" value={editForm.revenue ?? ""} onChange={(e) => setEditForm({ ...editForm, revenue: e.target.value })}/><input required type="number" placeholder="Year" value={editForm.year ?? ""} onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}/></>}
              {editType === "economy" && <><input required placeholder="Indicator Name" value={editForm.indicatorName || ""} onChange={(e) => setEditForm({ ...editForm, indicatorName: e.target.value })}/><input required type="number" placeholder="Value" value={editForm.value ?? ""} onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}/><input required placeholder="Unit" value={editForm.unit || ""} onChange={(e) => setEditForm({ ...editForm, unit: e.target.value })}/><input required type="number" placeholder="Year" value={editForm.year ?? ""} onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}/></>}
              <div className="edit-form-actions"><button type="button" className="cancel-btn" onClick={closeEdit}>Cancel</button><button type="submit" className="save-edit-btn">Save Changes</button></div>
            </form>
          </div>
        </div>
      )}

    </div>

  );

}

export default App;
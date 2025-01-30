import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const maxResistance = 75;

  const [resistances, setResistances] = useState({
    FIRE: "",
    COLD: "",
    LIGHTNING: "",
    CHAOS: "",
    ALL: "",
    INDIVIDUAL: {
      FIRE: "",
      COLD: "",
      LIGHTNING: "",
      CHAOS: "",
    },
  });

  const handleChange = (element, value, isIndividual = false) => {
    const numericValue = value === "" ? "" : parseInt(value, 10);
    if (isIndividual) {
      setResistances((prev) => ({
        ...prev,
        INDIVIDUAL: {
          ...prev.INDIVIDUAL,
          [element]: numericValue,
        },
      }));
    } else {
      setResistances((prev) => ({
        ...prev,
        [element]: numericValue,
      }));
    }
  };

  const calculateResistanceStatus = (
    value,
    allBonus,
    individualBonus,
    element
  ) => {
    const totalResistance =
      (value || 0) + (allBonus || 0) + (individualBonus || 0);
    if (totalResistance >= maxResistance) {
      return (
        <span>
          <strong className="fw-bold" style={getColorStyle(element)}>
            MAXED OUT{" "}
          </strong>
          <strong style={getColorStyle(element)}>{totalResistance}%</strong>{" "}
          total resistance right now.
        </span>
      );
    }
    return (
      <span>
        You need{" "}
        <strong style={getColorStyle(element)}>
          {maxResistance - totalResistance}%
        </strong>{" "}
        more to reach the max.
      </span>
    );
  };

  const getEmoji = (element) => {
    switch (element) {
      case "FIRE":
        return "🔥";
      case "COLD":
        return "❄️";
      case "LIGHTNING":
        return "⚡";
      case "CHAOS":
        return "☠️";
      default:
        return "";
    }
  };

  const getColorStyle = (element) => {
    switch (element) {
      case "FIRE":
        return { color: "red" };
      case "COLD":
        return { color: "#00ffff" }; // Ice color
      case "LIGHTNING":
        return { color: "yellow" };
      case "CHAOS":
        return { color: "purple" };
      default:
        return {};
    }
  };

  const allBonus = parseInt(resistances.ALL, 10) || 0;
  const individualBonus = resistances.INDIVIDUAL;

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#212121",
        minHeight: "100vh",
        color: "white",
        paddingTop: "50px",
      }}
    >
      <div style={{ textAlign: "center", width: "100%" }}>
        <h1 className="text-center mb-4">Resistance Tracker</h1>
        <div
          className="row justify-content-center"
          style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "900px" }}
        >
          {Object.keys(resistances)
            .filter((key) => key !== "ALL" && key !== "INDIVIDUAL")
            .map((element) => (
              <div className="col-md-6 mb-4" key={element}>
                <div
                  className="card"
                  style={{ backgroundColor: "#333", color: "white" }}
                >
                  <div className="card-body">
                    <h5
                      className="card-title text-center"
                      style={getColorStyle(element)}
                    >
                      {getEmoji(element)} {element} Resistance
                    </h5>
                    <div className="form-group">
                      <label htmlFor={`${element}-input`}>
                        Current {element} Resistance
                      </label>
                      <input
                        type="number"
                        id={`${element}-input`}
                        className="form-control"
                        value={resistances[element]}
                        onChange={(e) => handleChange(element, e.target.value)}
                        placeholder={`Enter current ${element} resistance`}
                      />
                    </div>
                    <p className="mt-3 text-center">
                      {calculateResistanceStatus(
                        parseInt(resistances[element], 10),
                        allBonus,
                        parseInt(individualBonus[element], 10),
                        element
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div
          className="row justify-content-center"
          style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "450px" }}
        >
          <div className="col-md-12 mb-4">
            <div
              className="card"
              style={{ backgroundColor: "#333", color: "white" }}
            >
              <div className="card-body">
                <h5
                  className="card-title text-center"
                  style={{ color: "white" }}
                >
                  % + to All Elemental Resistances
                </h5>
                <div className="form-group">
                  <label htmlFor="all-input">
                    Current % Bonus to All Resistances
                  </label>
                  <input
                    type="number"
                    id="all-input"
                    className="form-control"
                    value={resistances.ALL}
                    onChange={(e) => handleChange("ALL", e.target.value)}
                    placeholder="Enter % bonus to all resistances"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row justify-content-center"
          style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "900px" }}
        >
          <div className="col-md-12">
            <div
              className="card"
              style={{ backgroundColor: "#333", color: "white" }}
            >
              <div className="card-body">
                <h5 className="card-title text-center">
                  Add % to Individual Resistances
                </h5>
                <div className="row">
                  {Object.keys(individualBonus).map((element) => (
                    <div className="col-md-3" key={`individual-${element}`}>
                      <div className="form-group">
                        <label
                          htmlFor={`individual-${element}-input`}
                          style={getColorStyle(element)}
                        >
                          {getEmoji(element)} {element}
                        </label>
                        <input
                          type="number"
                          id={`individual-${element}-input`}
                          className="form-control"
                          value={individualBonus[element]}
                          onChange={(e) =>
                            handleChange(element, e.target.value, true)
                          }
                          placeholder={`+% ${element}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

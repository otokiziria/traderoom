import React from "react";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// get our fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage, faTable, faCode, faChartBar, faTools } from "@fortawesome/free-solid-svg-icons";
import { faBitcoin} from  "@fortawesome/free-brands-svg-icons";

function Menu() {
  return (
    <div id="layoutSidenav_nav" className="bg-light border-right">
      <nav className="sidenav shadow-right sidenav-light">
        <div className="sidenav-menu">
          <div id="accordionSidenav">
            <div className="sidebar-heading">Core Bootstrap </div>
            <div
              className="list-group list-group-flush"
              id="accordionSidenavPages"
            >
              {/*  /symbols */}
              <Link
                to="/administrator/dashboard/mt5"
                className="list-group-item list-group-item-action bg-light"
              >
                MT5
              </Link>

              <Accordion>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="10">
                      <FontAwesomeIcon icon={faTools} /> Settings / Layout
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="10">
                    <Card.Body>
                      <Link
                        to="/administrator/dashboard/nginx"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Nginx
                      </Link>

                      <Link
                        to="/administrator/dashboard/layouts"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Layout
                      </Link>
                      <Link
                        to="/administrator/dashboard/settings"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Website Settings
                      </Link>
                      <Link
                        to="/administrator/dashboard/crons"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Cron Jobs
                      </Link>
                      
                      <Link
                        to="/administrator/dashboard/errrep"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Error Reporting
                      </Link>
                      <Link
                        to="/administrator/dashboard"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Formulas
                      </Link>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="11">
                      <FontAwesomeIcon icon={faChartBar} /> Traderoom Data
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="11">
                    <Card.Body>
                      {/*  /widgettechnicalanalysis */}
                      {/*  /categories */}
                      <Link
                        to="/administrator/dashboard/categories"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Categories
                      </Link>
                      {/*  /activesymbols */}
                      <Link
                        to="/administrator/dashboard/activesymbols"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Active Symbols
                      </Link>
                      {/*  /symbolssettings */}
                      <Link
                        to="/administrator/dashboard/symbolssettings"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Symbols Settings
                      </Link>
                      {/*  /charts */}
                      <Link
                        to="/administrator/dashboard/headers"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Header
                      </Link>
                      <Link
                        to="/administrator/dashboard/charts"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Chart
                      </Link>

                      {/*  /totalfigures */}
                      <Link
                        to="/administrator/dashboard/totalfigures"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Total Figures
                      </Link>

                      {/*  /layouts */}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="12">
                      <FontAwesomeIcon icon={faBitcoin} /> MT5 Data
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="12">
                    <Card.Body>
                      {/*  /widgettechnicalanalysis */}
                      <Link
                        to="/administrator/dashboard/symbols"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Symbols
                      </Link>
                      {/*  /layouts */}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <FontAwesomeIcon icon={faCode} /> Widjets
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      {/*  /widgettechnicalanalysis */}
                      <Link
                        to="/administrator/dashboard/widgettechnicalanalysis"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Technical Analysis Widget
                      </Link>
                      {/*  /widgetsymbolprofile */}
                      <Link
                        to="/administrator/dashboard/widgetsymbolprofile"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Symbol Profile Widget
                      </Link>
                      {/*  /widgetmarketoverview */}
                      <Link
                        to="/administrator/dashboard/widgetmarketoverview"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Market Overview Widget
                      </Link>
                      {/*  /widgetfundamentaldata */}
                      <Link
                        to="/administrator/dashboard/widgetfundamentaldata"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Fundamental Data Widget
                      </Link>
                      {/*  /widgeteconomiccalendar */}
                      <Link
                        to="/administrator/dashboard/widgeteconomiccalendar"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Economic Calendar Widget
                      </Link>
                      {/*  /layouts */}
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                      <FontAwesomeIcon icon={faTable} /> Tables
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      {/*  /positions */}
                      <Link
                        to="/administrator/dashboard/positions"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Position Table
                      </Link>
                      {/*  /orders */}
                      <Link
                        to="/administrator/dashboard/orders"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Order Table
                      </Link>
                      {/*  /histories */}
                      <Link
                        to="/administrator/dashboard/histories"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        History Table
                      </Link>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="2">
                      <FontAwesomeIcon icon={faLanguage} /> Languages
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      {/*  /langcat */}
                      <Link
                        to="/administrator/dashboard/langcat"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Languages
                      </Link>
                      {/*  /lang */}
                      <Link
                        to="/administrator/dashboard/lang"
                        className="list-group-item list-group-item-action bg-light"
                      >
                        Translate
                      </Link>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card></Card>
              </Accordion>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Menu;

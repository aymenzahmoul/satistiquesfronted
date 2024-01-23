import React, { useState, useEffect, } from "react";
import { CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import Livestats2 from "../service/Livestats2";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faChartBar, faHouse, faMoneyCheck, faSackDollar, faTicket, faTruck } from '@fortawesome/free-solid-svg-icons';
import { faSolarPanel } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faPersonDotsFromLine } from '@fortawesome/free-solid-svg-icons';
import { Calendar } from "primereact/calendar";
import "./index.css"
import { Card } from 'primereact/card';
import LivestatsService from "../service/livestatsService";
import { addLocale } from 'primereact/api';
export default function StatsLive() {
  addLocale('fr', {
    firstDayOfWeek: 1,
    dayNames: [
      'dimanche',
      'lundi',
      'mardi',
      'mercredi',
      'jeudi',
      'vendredi',
      'samedi',
    ],
    dayNamesShort: ['dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam'],
    dayNamesMin: ['Dim', ' Lun', ' Mar', ' Mer', ' Jeu', ' Ven', ' Sam'],
    monthNames: [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ],
    monthNamesShort: [
      'jan',
      'fév',
      'mar',
      'avr',
      'mai',
      'jun',
      'jul',
      'aoû',
      'sep',
      'oct',
      'nov',
      'déc',
    ],
    today: 'aujourd\'hui',
    clear: 'Effacer',

  });


  const [livestats, setLivestats] = useState(null);
  const [livestat, setLivestat] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const res = await Livestats2.getLivestats2();
        setLivestat(res);

      } catch (err) {
        console.error(err);
      }
    };

    initializeData();

  }, []);
  useEffect(() => {
    const initializeData2 = async () => {
      try {
        const res = await LivestatsService.getLivestats();
        setLivestats(res);

      } catch (err) {
        console.error(err);
      }
    };
    // Invoke the initializeData function

    initializeData2()

  }, []);
  const recherche = async () => {
    const date1 = new Date();
    const dayOfMonth = ("0" + date1.getDate()).slice(-2);
    const month = ("0" + (date1.getMonth() + 1)).slice(-2);
    const year = date1.getFullYear();
    const concatenatedString = `${year}${month}${dayOfMonth}`;
    const filteredData = [];

    let isDateMatched = false;
    for (let i = 0; i < livestat.length; i++) {
      const item = livestat[i];
      if (item.date === concatenatedString) {
        isDateMatched = true;
        filteredData.push(item);
        // Mettez à jour les statistiques en direct uniquement pour la date correspondante
        if (item.devise === "DT") {
          livestats.TVA = parseFloat(item.TVA).toFixed(3);
          livestats.TotalHT = parseFloat(item.TotalHT).toFixed(3);
          livestats.TotalTTC = parseFloat(item.TotalTTC).toFixed(3);
          livestats.Especes = parseFloat(item.Especes).toFixed(3);
          livestats.CarteBancaire = parseFloat(item.CarteBancaire).toFixed(3);
          livestats.Cheques = parseFloat(item.Cheques).toFixed(3);
          livestats.SurPlace = parseFloat(item.SurPlace).toFixed(3);
          livestats.A_Emporter = parseFloat(item.A_Emporter).toFixed(3);
          livestats.Livraison = parseFloat(item.Livraison).toFixed(3);
          livestats.devise = item.devise;
          livestats.TicketResto = parseFloat(item.TicketResto).toFixed(3);
        } else {
          livestats.TVA = parseFloat(item.TVA).toFixed(2);
          livestats.TotalHT = parseFloat(item.TotalHT).toFixed(2);
          livestats.TotalTTC = parseFloat(item.TotalTTC).toFixed(2);
          livestats.Especes = parseFloat(item.Especes).toFixed(2);
          livestats.CarteBancaire = parseFloat(item.CarteBancaire).toFixed(2);
          livestats.Cheques = parseFloat(item.Cheques).toFixed(2);
          livestats.SurPlace = parseFloat(item.SurPlace).toFixed(2);
          livestats.A_Emporter = parseFloat(item.A_Emporter).toFixed(2);
          livestats.Livraison = parseFloat(item.Livraison).toFixed(2);
          livestats.devise = item.devise;
          livestats.TicketResto = parseFloat(item.TicketResto).toFixed(2);
        }
      } else {
        filteredData.push(item);
      }
    }
    // Réinitialisez les valeurs des statistiques en direct si la date ne correspond pas
    if (!isDateMatched) {
      livestats.TVA = 0.0;
      livestats.TotalHT = 0.0;
      livestats.TotalTTC = 0.0;
      livestats.Especes = 0.0;
      livestats.CarteBancaire = 0.0;
      livestats.Cheques = 0.0;
      livestats.SurPlace = 0.0;
      livestats.A_Emporter = 0.0;
      livestats.Livraison = 0.0;
      livestats.TicketResto = 0.0;
    }
  };
  const [filteredData, setFilteredData] = useState([]);

  const [date1, setDate1] = useState(new Date());


  const data = (date1) => {
    const dayOfMonth = ("0" + date1.getDate()).slice(-2);
    const month = ("0" + (date1.getMonth() + 1)).slice(-2);
    const year = date1.getFullYear();

    const concatenatedString = `${year}${month}${dayOfMonth}`;

    if (livestat && Array.isArray(livestat) && concatenatedString) {
      const filteredData = [];

      let isDateMatched = false;
      for (let i = 0; i < livestat.length; i++) {
        const item = livestat[i];
        if (item.date === concatenatedString) {
          isDateMatched = true;
          filteredData.push(item);
          // Update livestats only for the matched date
          if (item.devise === "DT") {
            livestats.TVA = parseFloat(item.TVA).toFixed(3);
            livestats.TotalHT = parseFloat(item.TotalHT).toFixed(3);
            livestats.TotalTTC = parseFloat(item.TotalTTC).toFixed(3);
            livestats.Especes = parseFloat(item.Especes).toFixed(3);
            livestats.CarteBancaire = parseFloat(item.CarteBancaire).toFixed(3);
            livestats.Cheques = parseFloat(item.Cheques).toFixed(3);
            livestats.SurPlace = parseFloat(item.SurPlace).toFixed(3);
            livestats.A_Emporter = parseFloat(item.A_Emporter).toFixed(3);
            livestats.Livraison = parseFloat(item.Livraison).toFixed(3);
            livestats.devise = item.devise;
            livestats.TicketResto = parseFloat(item.TicketResto).toFixed(3);
          }
          else {
            livestats.TVA = parseFloat(item.TVA).toFixed(2);
            livestats.TotalHT = parseFloat(item.TotalHT).toFixed(2);
            livestats.TotalTTC = parseFloat(item.TotalTTC).toFixed(2);
            livestats.Especes = parseFloat(item.Especes).toFixed(2);
            livestats.CarteBancaire = parseFloat(item.CarteBancaire).toFixed(2);
            livestats.Cheques = parseFloat(item.Cheques).toFixed(2);
            livestats.SurPlace = parseFloat(item.SurPlace).toFixed(2);
            livestats.A_Emporter = parseFloat(item.A_Emporter).toFixed(2);
            livestats.Livraison = parseFloat(item.Livraison).toFixed(2);
            livestats.devise = item.devise;
            livestats.TicketResto = parseFloat(item.TicketResto).toFixed(2);
          }

        } else {
          filteredData.push(item);
        }
      }
      // Reset livestats values if the date is not matched
      if (!isDateMatched) {
        livestats.TVA = 0.0;
        livestats.TotalHT = 0.0;
        livestats.TotalTTC = 0.0;
        livestats.Especes = 0.0;
        livestats.CarteBancaire = 0.0;
        livestats.Cheques = 0.0;
        livestats.SurPlace = 0.0;
        livestats.A_Emporter = 0.0;
        livestats.Livraison = 0.0;
        livestats.TicketResto = 0.0;
      }
      setFilteredData(filteredData);
    }
  };

  // Define a function to generate the style object
  const getCircleStyle = (width, height) => {
    return {
      width: `${width}px`,
      height: `${height}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  };
  const circleStyle = getCircleStyle(45, 45);
  const getTVAStyle = () => {
    return {
      fontSize: '3em',
      fontFamily: 'Helvetica',
    };
  };
  const styleFamily = () => {
    return {

      fontFamily: 'Helvetica',
    };
  };
  const stylef = styleFamily();
  const TVAStyle = getTVAStyle();
  return (
    <div >
      <div className="  d-flex justify-content-center align-items-center" >
        <Calendar
          className={`mon-calendrier `}
          id="pi pi-calendar"
          label={date1}
          value={date1}
          dateFormat="dd/mm/yy"
          locale="fr"
          onChange={(e) => {
            // setDate1(e.value)
            data(e.value)
          }}
          style={{

            height: "60px",
            fontSize: "30px",
            margin: "10px",
          }}
          showIcon
        />
      </div>

      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid style={stylef}>
          {livestats && (
            <div className="header-body color blue" >

              {/* Card stats */}
              <span className="h2 font-weight-bold mb-0"> Vue globale C.A</span>
              <br></br>
              <br></br>
              <Row >
                <Col lg="8" xl="3" md={{ span: 1, offset: 1 }}>
                  <Card className="card-stats bg-success text-white mb-5 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h4" className="text-white mr-3">
                            <span className="text-danger mr-3"></span>{" "}
                            Total HT
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"></span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape rounded-circle shadow">
                            <FontAwesomeIcon icon={faChartBar} style={{ fontSize: '2em', }} />
                          </div>
                        </Col>

                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">

                            <i className="fas fa-icon-name" />
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <p className="mt- mb-3">
                          <span className="text-danger mr-2"></span>{" "}
                          <span className="text-nowrap" style={TVAStyle}>{livestats.TotalHT} {livestats.devise}</span>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="8" xl="3" md={{ span: 1, offset: 1 }}>
                  <Card className="card-stats bg-warning text-white mb-5 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h4" className="text-white mr-3">
                            <span className="text-danger mr-3"></span>{" "}
                            TVA
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"></span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape rounded-circle shadow">
                            <FontAwesomeIcon icon={faSolarPanel} style={{ fontSize: '2em' }} />
                          </div>
                        </Col>
                        {/* Add another icon here */}
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            {/* Add the desired icon class or content here */}
                            <i className="fas fa-icon-name" />
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <p className="mt- mb-3">
                          <span className="text-danger mr-2"></span>{" "}
                          <span className="text-center" style={TVAStyle} >{livestats.TVA} {livestats.devise}</span>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="8" xl="3" md={{ span: 1, offset: 1 }}>
                  <Card className="card-stats bg-danger text-white mb-5 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h4" className="text-white ">
                            <span className="text-danger mr-3"></span>{" "}
                            Total TTC
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"></span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape rounded-circle shadow">
                            <FontAwesomeIcon icon={faPersonDotsFromLine} style={{ fontSize: '2em' }} />
                          </div>
                        </Col>
                        {/* Add another icon here */}
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            {/* Add the desired icon class or content here */}
                            <i className="fas fa-icon-name" />
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <p className="mt- mb-3">
                          <span className="text-danger mr-2"></span>{" "}
                          <span className="text-nowrap size 2" style={TVAStyle}>{livestats.TotalTTC} {livestats.devise}</span>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

              </Row>
              <br></br>
              <span className="h2 font-weight-bold mb-0"> Répartition CA par modes de paiement</span>
              <br></br>
              <br></br>
              <Row>
                <Col lg="8" xl="3" >
                  <Card className="card-stats mb-5 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h4" className="text-muted text-white text-center"
                          >
                            Espèces
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">

                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow" style={circleStyle}>
                            <FontAwesomeIcon icon={faSackDollar} style={{ fontSize: '2em' }} />
                          </div>

                        </Col>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow">

                            <i className="fas fa-icon-name" />
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <p className="  mt- mb-3">
                          <span className="text-success mr-2 rounded px-2">

                          </span>{" "}
                          <span className="  text-nowrap" style={TVAStyle} >{livestats.Especes} {livestats.devise}</span>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="8" xl="3"  >
                  <Card className="card-stats mb-5 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h4" className="text-muted text-white text-center"
                          >
                            Carte bancaire
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"></span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow" style={circleStyle}>
                            <FontAwesomeIcon icon={faCreditCard} style={{ fontSize: '2em' }} />
                          </div>
                        </Col>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">

                            <i className="fas fa-icon-name" />
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <p className=" mt- mb-3 ">
                          <span className="text-danger mr-2">

                          </span>{" "}
                          <span className=" text-nowrap" style={TVAStyle}>{livestats.CarteBancaire} {livestats.devise}</span>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="8" xl="3"  >
                  <Card className="card-stats mb-5 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h4" className="text-muted text-white text-center"
                          >
                            Chèques
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"></span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow" style={circleStyle}>
                            <FontAwesomeIcon icon={faMoneyCheck} style={{ fontSize: '2em' }} />
                          </div>
                        </Col>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">

                            <i className="fas fa-icon-name" />
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <p className="mt- mb-3 ">
                          <span className="text-warning mr-2">

                          </span>{" "}
                          <span className=" text-nowrap" style={TVAStyle}>{livestats.Cheques} {livestats.devise}</span>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="8" xl="3"  >
                  <Card className="card-stats mb-5 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h4" className="text-muted text-white text-center"
                          >
                            Ticket Resto
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"></span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-primary text-white rounded-circle shadow" style={circleStyle}>
                            <FontAwesomeIcon icon={faTicket} style={{ fontSize: '2em' }} />
                          </div>
                        </Col>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">

                            <i className="fas fa-icon-name" />
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <p className=" mt- mb-3 ">
                          <span className="text-warning mr-2">

                          </span>{" "}
                          <span className=" text-nowrap" style={TVAStyle}>{livestats.TicketResto} {livestats.devise}</span>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

              </Row>
              <br></br>
              <span className="h2 font-weight-bold mb-0"> Répartition CA par modes de consommation</span>
              <br></br>
              <br></br>
              <Row >
                <Col lg="8" xl="3" md={{ span: 1, offset: 1 }}>
                  <Card className="card-stats  mb-5 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h4" className=" ">
                            <span className="text-danger mr-3"></span>{" "}
                            Sur Place
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"></span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white  rounded-circle shadow" style={circleStyle}>
                            <FontAwesomeIcon icon={faHouse} style={{ fontSize: '2em' }} />
                          </div>
                        </Col>
                        {/* Add another icon here */}
                        <Col className="col-auto">
                          <div className="icon icon-shape  rounded-circle shadow">
                            {/* Add the desired icon class or content here */}
                            <i className="fas fa-icon-name" />
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <p className="mt- mb-3">
                          <span className="text-danger mr-2"></span>{" "}
                          <span className="text-nowrap" style={TVAStyle}>{livestats.SurPlace} {livestats.devise}</span>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="8" xl="3" md={{ span: 1, offset: 1 }}>
                  <Card className="card-stats  mb-5 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h4" className=" ">
                            <span className="text-danger mr-3"></span>{" "}
                            À Emporter
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"></span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-success text-white  rounded-circle shadow" style={circleStyle}>
                            <FontAwesomeIcon icon={faBagShopping} style={{ fontSize: '2em' }} />
                          </div>
                        </Col>
                        {/* Add another icon here */}
                        <Col className="col-auto">
                          <div className="icon icon-shape  rounded-circle shadow">
                            {/* Add the desired icon class or content here */}
                            <i className="fas fa-icon-name" />
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <p className="mt- mb-3">
                          <span className="text-danger mr-2"></span>{" "}
                          <span className="text-nowrap" style={TVAStyle}>{livestats.A_Emporter} {livestats.devise}</span>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

                <Col lg="8" xl="3" md={{ span: 1, offset: 1 }}>
                  <Card className="card-stats  mb-5 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle tag="h4" className=" ">
                            <span className="text-danger mr-3"></span>{" "}
                            Livraison
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"></span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white  rounded-circle shadow" style={circleStyle} >
                            <FontAwesomeIcon icon={faTruck} style={{ fontSize: '2em' }} />
                          </div>
                        </Col>
                        {/* Add another icon here */}
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            {/* Add the desired icon class or content here */}
                            <i className="fas fa-icon-name" />
                          </div>
                        </Col>
                      </Row>
                      <div className="text-center">
                        <p className="mt- mb-3">
                          <span className="text-danger mr-2"></span>{" "}
                          <span className="text-nowrap" style={TVAStyle} >{livestats.Livraison} {livestats.devise}</span>
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

              </Row>

            </div>
          )}
        </Container>
      </div>
    </div>
  );
}



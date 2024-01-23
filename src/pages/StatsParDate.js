import React, { useState, useEffect } from "react";
import { CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import LivestatsService from "../service/livestatsService";
import Livestats2 from "../service/Livestats2";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faChartBar, faHouse, faMoneyCheck, faMoneyCheckDollar, faTicket, faTruck } from '@fortawesome/free-solid-svg-icons';
import { faSolarPanel } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faPersonDotsFromLine } from '@fortawesome/free-solid-svg-icons';
import { Dialog } from 'primereact/dialog';
export default function StatsParDate() {

  const [visible, setVisible] = useState(false);
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
    // Invoke the initializeData function
    initializeData();

  }, []);
  useEffect(() => {
    const initializeData2 = async () => {
      try {
        const res =  await LivestatsService.getLivestats();
        setLivestats(res);
        
      } catch (err) {
        console.error(err);
      }
    };
    // Invoke the initializeData function
    initializeData2();
  }, []);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',

    },
  ]);
  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };
  const [formattedStartDate, setFormattedStartDate] = useState();
  const [formattedEndDate, setFormattedEndDate] = useState();


  const handleApply = () => {
    // Handle the selected date range
    const selectedDateRange = dateRange[0];
    const { startDate, endDate } = selectedDateRange;
    const formattedStart = `${startDate.getFullYear()}${String(startDate.getMonth() + 1).padStart(2, '0')}${String(startDate.getDate()).padStart(2, '0')}`;
    const formattedEnd = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, '0')}${String(endDate.getDate()).padStart(2, '0')}`;
    setFormattedStartDate(formattedStart);
    setFormattedEndDate(formattedEnd);
  };
  useEffect(() => {
    if (livestat && Array.isArray(livestat) && formattedStartDate && formattedEndDate) {

      const filteredData = [];
      let totalTVA = 0.0;
      let totalTotalHT = 0.0;
      let totalTotalTTC = 0.0;
      let totalEspeces = 0.0;
      let totalCarteBancaire = 0.0;
      let totalCheques = 0.0;
      let totalSurPlace = 0.0;
      let totalA_Emporter = 0.0;
      let totalLivraison = 0.0;

      for (let i = 0; i < livestat.length; i++) {
        const item = livestat[i];

        // Check if the item's date is within the selected date range
        if (item.date >= formattedStartDate && item.date <= formattedEndDate) {
          filteredData.push(item);

          // Sum up the properties
          totalTVA += parseFloat(item.TVA);
          totalTotalHT += parseFloat(item.TotalHT);
          totalTotalTTC += parseFloat(item.TotalTTC);
          totalEspeces += parseFloat(item.Especes);
          totalCarteBancaire += parseFloat(item.CarteBancaire);
          totalCheques += parseFloat(item.Cheques);
          totalSurPlace += parseFloat(item.SurPlace);
          totalA_Emporter += parseFloat(item.A_Emporter);
          totalLivraison += parseFloat(item.Livraison);
        }
      }
      const summedValues = {
        TVA: totalTVA.toFixed(2),
        TotalHT: totalTotalHT.toFixed(2),
        TotalTTC: totalTotalTTC.toFixed(2),
        Especes: totalEspeces.toFixed(2),
        CarteBancaire: totalCarteBancaire.toFixed(2),
        Cheques: totalCheques.toFixed(2),
        SurPlace: totalSurPlace.toFixed(2),
        A_Emporter: totalA_Emporter.toFixed(2),
        Livraison: totalLivraison.toFixed(2),
      };
      // Calculate the summed values based on the filtered data


      // Update Livestats state with the summed values
      setLivestats((prevLivestats) => ({
        ...prevLivestats,
        ...summedValues,
      }));

      setFilteredData(filteredData);

    }
  }, [livestat, formattedStartDate, formattedEndDate]);

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
  const shouldRenderMobileVersion = () => {
    return window.innerWidth <= 600;
  };
  const style2 = () => {
    return (
      <style>
        {`
          @media (max-width: 600px) {
            /* Adjust styles for mobile devices */
            /* For example, you can make the DateRange component full width */
            .your-component {
              width: 100%;
            }
          }
        `}
      </style>
    );
  };
  return (
    <div >
      <div className="d-flex justify-content-center align-items-center" >
        <div>
          <div className="d-flex justify-content-center align-items-center">
            <div >
              <div className="card-stats mb-4 mb-xl-0">
                <div className="flex field col-12 md:col-4">
                  <label htmlFor="icon"></label><br />
                  <Button

                    icon="pi pi-external-link"
                    onClick={() => setVisible(true)}
                    style={{
                      backgroundColor: '#0061B8',
                      color: 'white',
                      borderRadius: '5%',
                      padding: '1% 2%', // Adjust padding as needed
                    }}
                  >
                    <span className="px-3"> Clique</span></Button>
                  <Dialog
                    visible={visible}
                    // Adjust width for mobile
                    onHide={() => setVisible(false)}
                  >
                    <DateRange className="ant-calendar-range justify-content-center" ranges={dateRange} onChange={handleSelect}>
                      {/* Your DateRange component content */}
                    </DateRange>
                    <Button
                      style={{
                        backgroundColor: '#0061B8',
                        color: 'white',
                        borderRadius: '5%',
                        padding: '2% 4%', // Adjust padding as needed

                        margin: '4%', // Adjust margin as needed
                      }}
                      visible={visible}
                      className="slack field col-4 md:col-4 flex-end"
                      onClick={() => {
                        setVisible(false);
                        handleApply();
                      }}
                    >
                      <i className="pi pi-slack "></i>
                      <span className="px-3"> Apply</span>
                    </Button>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid style={stylef}>
          {livestats && (
            <div className="header-body color blue" >

              {/* Card stats */}
              <span className="h2 font-weight-bold mb-0"> Vue Globale C.A</span>
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
                          <div className="icon icon-shape   rounded-circle shadow">
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
              <span className="h2 font-weight-bold mb-0"> Réparitition CA par mode de paiements</span>
              <br></br>
              <br></br>
              <Row>
                <Col lg="8" xl="3" >
                  <Card className="card-stats mb-5 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h4" className="text-muted text-white "
                          >
                            <span className="text-danger mr-3"></span>{" "}
                            Especes
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">

                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow" style={circleStyle}>
                            <FontAwesomeIcon icon={faMoneyCheckDollar} style={{ fontSize: '2em' }} />
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
                            tag="h4" className="text-muted text-white "
                          >
                            <span className="text-danger mr-3"></span>{" "}
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
                            tag="h4" className="text-muted text-white "
                          >
                            <span className="text-danger mr-3"></span>{" "}
                            Cheques
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
                            tag="h4" className="text-muted text-white"
                          >
                            <span className="text-danger mr-3"></span>{" "}
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
              <span className="h2 font-weight-bold mb-0"> Repartition CA par Mode de Consommation</span>
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
                            A Emporter
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

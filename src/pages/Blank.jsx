import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';


import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import SumData from '../service/SumData';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { MultiSelect } from 'primereact/multiselect';

const Blank = () => {



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
    const basicData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: '#42A5F5',
                tension: .4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: '#FFA726',
                tension: .4
            }
        ]
    };



    const getLightTheme = () => {
        const basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        const multiAxisOptions = {
            stacked: false,
            maintainAspectRatio: false,
            aspectRatio: .6,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        drawOnChartArea: false,
                        color: '#ebedef'
                    }
                }
            }
        };

        return {
            basicOptions,
            multiAxisOptions
        };
    };
    const [livestats, setLivestats] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('January'); // Default selected month
    const [basicChartData, setBasicChartData] = useState({});
    const [basicChartOptions, setBasicChartOptions] = useState({});
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
  

    useEffect(() => {
        const fetchData = async () => {
          try {
            const date1 = "20231206";
            const date2 = "20231209";
            const result = await SumData.getLivestatByIdandDate(date1, date2, selectedMonth);
            setLivestats(result);
          } catch (error) {
            console.error("Error fetching livestats:", error);
          }
        };
    
        fetchData();
      }, [selectedMonth]);
    
      useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const tvaValues = livestats.map(stat => stat.TVA);
        const totalHValues = livestats.map(stat => stat.TotalHT);
        const totalTTCValues = livestats.map(stat => stat.TotalTTC);
    
        const updatedBasicChartData = {
          labels: ['TVA', 'TOTALH', 'TOTALTTC'],
          datasets: [
            {
              data: [tvaValues, totalHValues, totalTTCValues],
              backgroundColor: [
                documentStyle.getPropertyValue('--blue-500'),
                documentStyle.getPropertyValue('--yellow-500'),
                documentStyle.getPropertyValue('--green-500')
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue('--blue-400'),
                documentStyle.getPropertyValue('--yellow-400'),
                documentStyle.getPropertyValue('--green-400')
              ]
            }
          ]
        };
    
        setBasicChartData(updatedBasicChartData);
      }, [livestats]);
    
      useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const tvaValues = livestats.map(stat => stat.TVA);
        const totalHValues = livestats.map(stat => stat.TotalHT);
        const totalTTCValues = livestats.map(stat => stat.TotalTTC);
    
        const updatedChartData = {
          labels: ['TVA', 'TOTALH', 'TOTALTTC'],
          datasets: [
            {
              data: [tvaValues, totalHValues, totalTTCValues],
              backgroundColor: [
                documentStyle.getPropertyValue('--blue-500'),
                documentStyle.getPropertyValue('--yellow-500'),
                documentStyle.getPropertyValue('--green-500')
              ],
              hoverBackgroundColor: [
                documentStyle.getPropertyValue('--blue-400'),
                documentStyle.getPropertyValue('--yellow-400'),
                documentStyle.getPropertyValue('--green-400')
              ]
            }
          ]
        };
    
        setChartData(updatedChartData);
      }, [livestats]);
    
      const options = getLightTheme();
    
      const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
      };
      const [selectedCities, setSelectedCities] = useState(null);
    const groupedCities = [
        {
            label: 'Germany',
            code: 'DE',
            items: [
                { label: 'Berlin', value: 'Berlin' },
          
            ]
        },
        
        {
            label: 'USA',
            code: 'US',
            items: [
                { label: 'Chicago', value: 'Chicago' },
               
            ]
        },
        {
            label: 'Japan',
            code: 'JP',
            items: [
                { label: 'Kyoto', value: 'Kyoto' },
          
            ]
        }
    ];

    const groupedItemTemplate = (option) => {
        return (
            <div className="flex align-items-center">
               
                <div>{option.label}</div>
            </div>
        );
    };


    return (


<div>

<Row>
                <Col lg="4" xl="3" >
                  <Card className="card-stats mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h4" className="text-muted text-white text-center"
                          >
                            {/* Espèces */}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">

                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-success text-white rounded-circle shadow" style={circleStyle}>
                            
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
                            {/* Carte bancaire */}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"></span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow" style={circleStyle}>
                           
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
                            {/* Chèques */}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"></span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow" style={circleStyle}>
                          
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
                            {/* Ticket Resto */}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0"></span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-primary text-white rounded-circle shadow" style={circleStyle}>
                            
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
                          
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                </Col>

              </Row>

        <div className="flex">
      <div className="chart-container  pt-8  justify-content-center ">
        
         
       
          <Col lg="9" xl="12" className="justify-content-center">
           
         
              <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-25rem" />
           
          </Col>
       
      </div>
    </div>


    </div>




    );
};

export default Blank;

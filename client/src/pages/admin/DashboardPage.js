import React, { useEffect } from "react";
import Chart from "react-google-charts";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import getError from "../../utils/getError.js";
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";

import { useSelector, useDispatch } from "react-redux";
import {
  dashboardFetchRequest,
  dashboardFetchSuccess,
  dashboardFetchFail,
} from "../../state/actions/dashboardActions";

const DashboardPage = () => {
  const { loading } = useSelector((state) => state.dashboard);
  const { summary } = useSelector((state) => state.dashboard);
  const { error } = useSelector((state) => state.dashboard);

  const { userInfo } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(dashboardFetchRequest());
        const { data } = await axios.get("/orders/summary", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch(dashboardFetchSuccess(data));
      } catch (err) {
        dispatch(dashboardFetchFail(getError(err)));
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container className="mt-3">
        <h1>Dashboard</h1>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {summary.users && summary.users[0]
                        ? summary.users[0].numUsers
                        : 0}
                    </Card.Title>
                    <Card.Text> Users</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {summary.orders && summary.users[0]
                        ? summary.orders[0].numOrders
                        : 0}
                    </Card.Title>
                    <Card.Text> Orders</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      $
                      {summary.orders && summary.users[0]
                        ? summary.orders[0].totalSales.toFixed(2)
                        : 0}
                    </Card.Title>
                    <Card.Text> Orders</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="my-3">
              <h2>Sales</h2>
              {summary.dailyOrders.length === 0 ? (
                <MessageBox>No Sale</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart...</div>}
                  data={[
                    ["Date", "Sales"],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              )}
            </div>
            <div className="my-3">
              <h2>Categories</h2>
              {summary.productCategories.length === 0 ? (
                <MessageBox>No Category</MessageBox>
              ) : (
                <Chart
                  width="100%"
                  height="400px"
                  chartType="PieChart"
                  loader={<div>Loading Chart...</div>}
                  data={[
                    ["Category", "Products"],
                    ...summary.productCategories.map((x) => [x._id, x.count]),
                  ]}
                ></Chart>
              )}
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default DashboardPage;

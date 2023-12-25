import React from "react";
import "./Dashboard.css";
import { MyChart, Earning } from "./myChart";
import { FaShoppingBasket, FaUsers } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@mui/material";

const Dashboard = () => {
  return (
    <div className="dashboard container">
      <div className="cardgroup">
        <div className="card">
          <div>
            <div className="numbers">1024</div>
            <div className="cardname">Sales</div>
          </div>
          <div className="card__icon">
            <FiShoppingCart />
          </div>
        </div>

        <div className="card">
          <div>
            <div className="numbers">130</div>
            <div className="cardname">Products</div>
          </div>
          <div className="card__icon">
            <FaShoppingBasket />
          </div>
        </div>

        <div className="card">
          <div>
            <div className="numbers">86</div>
            <div className="cardname">Customers</div>
          </div>
          <div className="card__icon">
            <FaUsers />
          </div>
        </div>

        <div className="card">
          <div>
            <div className="numbers">₹260000</div>
            <div className="cardname">Earning</div>
          </div>
          <div className="card__icon">
            <MdAttachMoney />
          </div>
        </div>
      </div>

      <div className="dashboard__charts">
        <div className="box">
          <MyChart />
        </div>
        <div className="box">
          <Earning />
        </div>
      </div>

      <div className="details">
        <div className="recent_sales">
          <div className="cardheader">
            <h2 className="detail__heading">Recent Sales</h2>
            <a href="#" className="button">
              View All
            </a>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Book</TableCell>
                <TableCell>50</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>
                  <span className="status delivered">Delivered</span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Pen</TableCell>
                <TableCell>10</TableCell>
                <TableCell>Due</TableCell>
                <TableCell>
                  <span className="status pending">Pending</span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Rubber</TableCell>
                <TableCell>15</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>
                  <span className="status return">Return</span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Scale</TableCell>
                <TableCell>20</TableCell>
                <TableCell>Due</TableCell>
                <TableCell>
                  <span className="status pending">Pending</span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Pencil</TableCell>
                <TableCell>10</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>
                  <span className="status in_progress">Progress</span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Compas</TableCell>
                <TableCell>70</TableCell>
                <TableCell>Paid</TableCell>
                <TableCell>
                  <span className="status delivered">Delivered</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="recent_customers">
          <div className="cardheader">
            <h2 className="detail__heading">Recent Customers</h2>
          </div>

          <Table>
            <TableBody>
              <TableRow>
                <TableCell width="110px">
                  <h4>
                    Sagar
                    <br />
                    <span>Pune</span>
                  </h4>
                </TableCell>
                <TableCell className="mobile_number">8564758644</TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="60px">
                  <h4>
                    Suraj
                    <br />
                    <span>Belgaum</span>
                  </h4>
                </TableCell>
                <TableCell className="mobile_number">8050378812</TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="60px">
                  <h4>
                    Nitin
                    <br />
                    <span>Dharwad</span>
                  </h4>
                </TableCell>
                <TableCell className="mobile_number">8564758655</TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="60px">
                  <h4>
                    Rahul
                    <br />
                    <span>Mumbai</span>
                  </h4>
                </TableCell>
                <TableCell className="mobile_number">8565238643</TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="60px">
                  <h4>
                    Vikas
                    <br />
                    <span>Akluj</span>
                  </h4>
                </TableCell>
                <TableCell className="mobile_number">8564758531</TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="60px">
                  <h4>
                    Swapnil
                    <br />
                    <span>Wani</span>
                  </h4>
                </TableCell>
                <TableCell className="mobile_number">8564758110</TableCell>
              </TableRow>

              <TableRow>
                <TableCell width="60px">
                  <h4>
                    Akshay
                    <br />
                    <span>Shirdi</span>
                  </h4>
                </TableCell>
                <TableCell className="mobile_number">9864758777</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import ReactDOM from "react-dom";
import ReactToPrint from "react-to-print";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "./components/Row/Row.css";

import "./styles.css";

import Row from "./components/Row";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      headings: [
        { centered: false, id: "tHead1", text: "ID" },
        { centered: false, id: "tHead2", text: "Description" },
        { centered: true, id: "tHead3", text: "Hours" },
        { centered: false, id: "tHead4", text: "Rate" },
        { centered: false, id: "tHead4", text: "Total" }
      ],
      items: [],
      text: {
        companyLogo: null,
        company: "",
        fullName: "",
        website: "",
        companyAddress: "",
        city: "",
        country: "",
        phone: "",
        email: "",
        clientCompany: "",
        clientName: "",
        cleintAddress: "",
        clientCity: "",
        clientCountry: "",
        invoiceDate: undefined,
        invoiceDueDate: undefined,
        invoiceNum: "78732"
      }
    };
  }

  // handle file upload (logo)
  handleFileUpload = e => {
    const file = e.target.files[0];
    this.setState(prevState => ({
      text: {
        ...prevState.text,
        companyLogo: URL.createObjectURL(file)
      }
    }));
    //Or this
    // e.persist();
    // this.setState(prevState => ({
    //   text: {
    //     ...prevState.text,
    //     companyLogo: URL.createObjectURL(e.target.files[0])
    //   }
    // }));
  };

  //Add default Image
  addDefaultSrc = ev => {
    ev.target.src = "http://lees.fe.uni-lj.si/uploads/default-logo.png";
  };

  // Handle Invoice Date
  handleDayChange = day => {
    this.setState(prevState => ({
      text: {
        ...prevState.text,
        invoiceDate: day
      }
    }));
  };

  // Update Table Headings
  handleOnChange = e => {
    const { name: id, value: text } = e.target;
    this.setState(({ headings }) => ({
      headings: headings.map(
        heading => (heading.id === id ? { ...heading, text } : heading)
      )
    }));
  };

  // Add new item to the Items list
  handleOnClick = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
      items: [
        ...prevState.items,
        { id: this.state.count, description: "", hours: "", rate: "" }

      ]
    }));
  };

  // Update Item
  handleItemUpdate = (e, id) => {
    const { name, value } = e.target;
    const { items } = this.state;

    const findItem = items.find(item => item.id === id);

    this.setState(({ items }) => ({
      items: items.map(
        item => (item.id === findItem.id ? { ...item, [name]: value } : item)
      )
    }));
  };

  // Remove item from Items list
  handleRemoveItem = id => {
    const { items } = this.state;
    const removeIndex = items.findIndex(item => item.id === id);
    const updatedItems = [
      ...items.slice(0, removeIndex),
      ...items.slice(removeIndex + 1)
    ];

    this.setState({ items: updatedItems, count: this.state.count - 1 });
  };

  //handle company and cliend info change
  handleOnChangeCompanyInfo = e => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      ...prevState,
      text: {
        ...prevState.text,
        [name]: value
      }
    }));
  };

  render() {
    return (
      <div className="wrapper">
        <div className="download-container">
          <ReactToPrint
            trigger={() => (
              <a href="#" className="download-btn">
                Print this out!
              </a>
            )}
            content={() => this.componentRef}
          />
        </div>
        <div className="container" ref={el => (this.componentRef = el)}>
          <div className="text-container">
            <div className="text left">
              <h2 className="invoice-title">sumit <span style={{fontWeight: "400"}}>invoice</span></h2>
              <div className="compnay-info">
                <div className="compnay-input-container">
                  <input
                    type="text"
                    name="company"
                    width="100%"
                    placeholder="Your Company*"
                    value={this.state.text.company}
                    onChange={this.handleOnChangeCompanyInfo}
                    className="compnay-name"
                  />
                </div>
                <div className="compnay-input-container">
                  <input
                    type="text"
                    name="fullName"
                    width="100%"
                    placeholder="Your First and Last Name*"
                    value={this.state.text.fullName}
                    onChange={this.handleOnChangeCompanyInfo}
                  />
                </div>
                <div className="compnay-input-container">
                  <input
                    type="text"
                    name="website"
                    width="100%"
                    placeholder="Company Website*"
                    value={this.state.text.website}
                    onChange={this.handleOnChangeCompanyInfo}
                  />
                </div>
                <div className="compnay-input-container">
                  <input
                    type="text"
                    name="companyAddress"
                    width="100%"
                    placeholder="Company Address"
                    value={this.state.text.companyAddress}
                    onChange={this.handleOnChangeCompanyInfo}
                  />
                </div>
                <div className="compnay-input-container">
                  <input
                    type="text"
                    name="city"
                    width="100%"
                    placeholder="City, State ZIP"
                    value={this.state.text.city}
                    onChange={this.handleOnChangeCompanyInfo}
                  />
                </div>
                <div className="compnay-input-container">
                  <input
                    type="text"
                    name="country"
                    width="100%"
                    placeholder="Country"
                    value={this.state.text.country}
                    onChange={this.handleOnChangeCompanyInfo}
                  />
                </div>
                <div className="compnay-input-container">
                  <input
                    type="text"
                    name="phone"
                    width="100%"
                    placeholder="Phone No.*"
                    value={this.state.text.phone}
                    onChange={this.handleOnChangeCompanyInfo}
                  />
                </div>
                <div className="compnay-input-container">
                  <input
                    type="text"
                    name="email"
                    width="100%"
                    placeholder="Email Address*"
                    value={this.state.text.email}
                    onChange={this.handleOnChangeCompanyInfo}
                  />
                </div>
              </div>
              {/*compnay-info-ends*/}
              <div
                className="compnay-info"
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                <div className="compnay-input-container">
                  <input
                    type="text"
                    width="100%"
                    name="clientCompany"
                    placeholder="Client's Company"
                    value={this.state.text.clientCompany}
                    onChange={this.handleOnChangeCompanyInfo}
                    className="compnay-name"
                  />
                </div>
                <div className="compnay-input-container">
                  <input
                    type="text"
                    width="100%"
                    name="clientName"
                    placeholder="Client's Name"
                    value={this.state.text.clientName}
                    onChange={this.handleOnChangeCompanyInfo}
                  />
                </div>
                <div className="compnay-input-container">
                  <input
                    type="text"
                    width="100%"
                    name="cleintAddress"
                    placeholder="Client's Address"
                    value={this.state.text.cleintAddress}
                    onChange={this.handleOnChangeCompanyInfo}
                  />
                </div>
                <div className="compnay-input-container">
                  <input
                    type="text"
                    width="100%"
                    name="clientCity"
                    placeholder="City, State ZIP"
                    value={this.state.text.clientCity}
                    onChange={this.handleOnChangeCompanyInfo}
                  />
                </div>
                <div className="compnay-input-container">
                  <input
                    type="text"
                    width="100%"
                    name="clientCountry"
                    placeholder="Country"
                    value={this.state.text.clientCountry}
                    onChange={this.handleOnChangeCompanyInfo}
                  />
                </div>
              </div>
            </div>
            {/* Right Starts here*/}
            <div className="text right">
              <div className="logo-container">
                <span className="upload-text" id="upldTXT">Click to upload<br/><span style={{color: "silver", fontSize: "14px", margin: ""}}>225px</span></span>
                <input
                  type="file"
                  className="upload-button"
                  onChange={this.handleFileUpload}
                  accept="image/*"
                />
                <img
                  src={this.state.text.companyLogo}
                  crossOrigin="anonymous"
                  alt=""
                  onError={this.addDefaultSrc}
                />
              </div>
              <div className="invoice-container">
                <div className="sc-bdVaJa cJYNBQ">
                  <input
                    className=""
                    type="text"
                    width="30%"
                    value="Invoice No:"
                  />
                  <input
                    type="text"
                    className=""
                    value={this.state.text.invoiceNum}
                  />
                </div>
                <div className="sc-bZQynM frsoyH">
                  <input className="" type="text" value="Invoice Date:" />
                  <div>
                    <DayPickerInput
                      dayPickerProps={{
                        showWeekNumbers: true,
                        todayButton: "Today"
                      }}
                      onDayChange={this.handleDayChange}
                      name="invoiceDate"
                    />
                  </div>
                </div>
                <div className="sc-bZQynM frsoyH">
                  <input className="" type="text" value="Due Date:" />
                  <div>
                    <DayPickerInput
                      dayPickerProps={{
                        showWeekNumbers: true,
                        todayButton: "Today"
                      }}
                      onDayChange={this.handleDayChange}
                      name="invoiceDueDate"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="table-container"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "3em 0px"
            }}
          >
            <table>
              <thead>
                <tr>
                  {this.state.headings.map(heading => (
                    <th colSpan="1" key={heading.id}>
                      <div>
                        <input
                          type="text"
                          className="thInput"
                          name={heading.id}
                          value={heading.text}
                          placeholder={heading.text}
                          onChange={this.handleOnChange}
                        />
                      </div>
                    </th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map(item => (
                  <Row
                    key={item.id}
                    item={item}
                    removeItem={this.handleRemoveItem}
                    updateItem={this.handleItemUpdate}
                  />
                ))}
              </tbody>
              
            </table>
            <div id="invoiceDropdown" onClick={this.handleOnClick} className="add-more-btn">
              <span>+ Add to Invoice</span>
            </div>

          </div>
        </div>
      </div>
    );
  }
}



const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

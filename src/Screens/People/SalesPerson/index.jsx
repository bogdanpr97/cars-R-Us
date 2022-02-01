import './styles.scss';
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState } from 'react';
import { DataContext } from '../../../Context';

function sortByPriceFunc(a, b, order) {
  if(order === 'asc') {
    return a?.soldFor - b?.soldFor;
  } else {
    return b?.soldFor - a?.soldFor;
  }
}

function sortByDateFunc(a,b, order) {
  if(order === 'asc') {
    return new Date(a.dateOfSale) - new Date(b.dateOfSale);
  } else {
    return new Date(b.dateOfSale) - new Date(a.dateOfSale);
  }
};

function SalesPerson() {
  const [sortByPrice, setSortByPrice] = useState('');
  const [sortByDate, setSortByDate] = useState('');

  let navigate = useNavigate();
  let { personId } = useParams();
  let { state, removeSalesPerson } = useContext(DataContext);
  let sellerData = state?.sellers.find(seller => seller?.id === personId);

  const [personSales, setPersonSales] = useState(state?.records.filter((record) => record?.sellerId === personId))
  const [sortedPersonSales, setSortedPersonSales] = useState(personSales)

  const handleSortByPrice = (e) => {
    const value = e.target.value;
    setSortByPrice(value);
    setSortByDate("");
    setSortedPersonSales(personSales.sort((a, b) => sortByPriceFunc(a, b, value)));
  }

  const handleSortByDate = (e) => {
    const value = e.target.value;
    setSortByDate(value);
    setSortByPrice("");
    setSortedPersonSales(personSales.sort((a, b) => sortByDateFunc(a, b, value)));
  }

  return (
    <div className="seller-container">
      <div className="top-container">
        <div className="header-text">Sales Person - {sellerData?.firstName} {sellerData?.lastName}</div>
        <button
          className="delete-button"
          onClick={() => {
            removeSalesPerson(personId);
            navigate('/sales-people');
          }}
        >
          Delete Sales Person
        </button>
      </div>
      <div className="content-container">
        <div className="header-text">Sales History</div>
        <div>
          <span>Sort By Price</span>
          <select name="sortByPrice" value={sortByPrice} onChange={handleSortByPrice}>
            <option value="" selected disabled hidden>Choose Order</option>
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
          <span>Sort By Date</span>
            <select name="sortByDate" value={sortByDate} onChange={handleSortByDate}>
              <option value="" selected disabled hidden>Choose Order</option>
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
          </select>
        </div>
        <div className="records-container">
        {sortedPersonSales.map((record) => {
          const recordCar = state?.cars?.find(car => car?.id == record?.soldCarId);

          return (
            <div className="record-box" key={record?.id}>
              sold - {recordCar?.name} - for - {record?.soldFor} - on - {record?.dateOfSale}
            </div>
          );
        })}
      </div>
      </div>
    </div>
  )
}

export default SalesPerson;
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../../../Context';
import { useForm } from '../../../Utils/hooks/UseForm';
import './styles.scss';

function ManageSalesPeople() {
  const { state, addSalesPerson } = useContext(DataContext);
  const {formData, handleInputChange, handleSubmit } = useForm({
      firstName: "",
      lastName: "",
    }, addSalesPerson);

  return (
    <div className="container">
      <div className="header-text">Add Seller</div>
      <div className="form-container">
         <form onSubmit={handleSubmit}>
         <label>
           First Name
           <input
             name="firstName"
             type="text"
             value={formData.firstName}
             onChange={handleInputChange} />
         </label>
         <br />
         <label>
           Last name
           <input
             name="lastName"
             type="text"
             value={formData.lastName}
             onChange={handleInputChange} />
         </label>
         <button type="submit">ADD SELLER</button>
       </form>
      </div>
      <div className="header-text">Sellers List</div>
      {state?.sellers?.map(seller => {
        return (
          <Link 
            className="seller-box"
            to={`/sales-people/${seller?.id}`}
            key={seller?.id}
          >
            <span>{seller?.firstName} {seller?.lastName}</span>
          </Link>
        );
      })}
    </div>
  )
}

export default ManageSalesPeople;
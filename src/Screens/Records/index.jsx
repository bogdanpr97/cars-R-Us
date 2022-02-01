import { useContext, useState } from "react";
import { DataContext } from "../../Context";
import { useForm } from "../../Utils/hooks/UseForm";
import "./styles.scss";

function Records() {
  const { state, sellCar } = useContext(DataContext);
  const { cars, sellers, records } = state;
  const { formData, handleInputChange, handleSubmit } = useForm(
    {
      soldCarId: "",
      sellerId: "",
      soldFor: "",
      buyerName: "",
      dateOfSale: new Date(),
    },
    sellCar
  );
  
  const selectedCar = cars?.find(car => car?.id === formData?.soldCarId);
  const showPriceError = selectedCar?.minPrice > parseFloat(formData?.soldFor);

  // show cars that are still available
  const availableCars = cars?.filter(car => !car?.sold);

  return (
    <div className="records-page-container">
      <div className="header-text">Record Sale</div>
      <div className="form-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (showPriceError) return;
            handleSubmit(e);
          }}
        >
          <label>
            Sold Car
            <select
              name="soldCarId"
              value={formData?.soldCarId}
              onChange={handleInputChange}
            >
              <option value="" selected disabled hidden>Choose Car</option>
              {availableCars.map((car) => (
                <option value={car?.id} key={car?.id}>
                  {car?.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Seller
            <select
              name="sellerId"
              value={formData?.sellerId}
              onChange={handleInputChange}
            >
              <option value="" selected disabled hidden>Choose Seller</option>
              {sellers.map((seller) => (
                <option value={seller?.id} key={seller?.id}>
                  {seller?.firstName} {seller?.lastName}
                </option>
              ))}
            </select>
          </label>
          <label>
            Buyer Name
            <input
              name="buyerName"
              type="text"
              value={formData?.buyerName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Date Of Sale
            <input
              type="date" id="start" name="trip-start"
              min="2010-01-01" 
              max="2030-12-31"
              name="dateOfSale"
              value={formData?.dateOfSale}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Sales Price
            <input
              name="soldFor"
              type="text"
              value={formData.soldFor}
              onChange={handleInputChange}
            />
          </label>
          {showPriceError && (
            <div className="error-text">
              Price must be higher than the minimum price of the car
            </div>
          )}
          <button type="submit">ADD RECORD</button>
        </form>
      </div>
      <div className="header-text">Records List</div>
      <div className="records-container">
        {records.map((record) => {
          const recordSeller = sellers?.find(seller => seller?.id == record?.sellerId);
          const recordCar = cars?.find(car => car?.id == record?.soldCarId);

          return (
            <div className="record-box" key={record?.id}>
              {recordSeller?.firstName} {recordSeller?.lastName} - sold - {recordCar?.name} - for - {record?.soldFor} $
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Records;

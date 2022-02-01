import { useContext } from 'react';
import { DataContext } from '../../../Context';
import { useForm } from '../../../Utils/hooks/UseForm';
import './styles.scss';

function ManageCars() {
  const { state, addCar } = useContext(DataContext);
  const {formData, handleInputChange, handleSubmit } = useForm({
      name: "",
      color: "",
      minPrice: "",
    }, addCar);

  return (
    <div className="manage-container">
      <div className="header-text">Add Cars</div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Name
            <input
              name="name"
              type="text"
              value={formData?.name}
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Color
            <input
              name="color"
              type="text"
              value={formData?.color}
              onChange={handleInputChange} />
          </label>
          <br />
          <label>
            Minimum Price
            <input
              name="minPrice"
              type="text"
              value={formData?.minPrice}
              onChange={handleInputChange} />
          </label>
          <br />
          <button type="submit">ADD CAR</button>
        </form>
      </div>
      <div className="header-text">Cars List</div>
      <div className="cars-container">
        {state?.cars?.map(car => {
          return (
            <div 
              className="car-box"
              key={car?.id}
            >
              {car?.name} - {car?.color} {car?.sold && " - sold!!"}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ManageCars;
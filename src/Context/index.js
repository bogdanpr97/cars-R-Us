import { createContext, useState } from 'react';
import { generateId } from '../Utils/utils';


const initialState = {
  cars: [
    {
      id: generateId(),
      name: "Vectra",
      color: "blue",
      minPrice: 1000,
      sold: false,
    },
    {
      id: generateId(),
      name: "Ferrari",
      color: "red",
      minPrice: 1000,
      sold: false,
    },
    {
      id: generateId(),
      name: "Toyota",
      color: "gray",
      minPrice: 1000,
      sold: false,
    }
  ],
  sellers: [
    {
      id: generateId(),
      firstName: "Will",
      lastName: "Joe",
      numberOfSales: 0,
    },
    {
      id: generateId(),
      firstName: "John",
      lastName: "Doe",
      numberOfSales: 1,
    },
    {
      id: generateId(),
      firstName: "Mark",
      lastName: "Twain",
      numberOfSales: 2,
    },
  ],
  records: [

  ]
};

const DataContext = createContext(initialState);

function DataProvider({ children }) {
  const [state, setState] = useState(initialState);

  const addSalesPerson = (seller) => {
    setState({
      ...state,
      sellers: [
        ...state?.sellers,
        {
          ...seller,
          id: generateId()
        }
      ]
    });
  };

  const removeSalesPerson = (sellerId) => {
    setState({
      ...state,
      sellers: state?.sellers.filter(seller => seller?.id !== sellerId)
    });
  }

  const addCar = (car) => {
    setState({
      ...state,
      cars: [
        ...state?.cars, 
        {
          ...car,
          sold: false,
          id: generateId()
        }
      ]
    });
  };

  const sellCar = ({ soldCarId, soldFor, buyerName, dateOfSale , sellerId }) => {
    // get the seller
    const seller = state?.sellers.find((seller) => sellerId === seller?.id);


    // add sell details for the car that was sold
    const modifiedCarsArray = state.cars.map(car => {
      if(car?.id === soldCarId) {
        return {
          ...car,
          sold: true,
          soldFor,
        }
      }
      return car;
    });

    // record the sale
    const recordsArray = [
      ...state.records,
      {
        id: generateId(),
        buyerName,
        dateOfSale,
        soldCarId,
        soldFor,
        sellerFirstName: seller?.firstName,
        sellerId: seller?.id,
      }
    ];

    setState({
      ...state,
      cars: modifiedCarsArray,
      records: recordsArray
    });

  }

  const getBestAndWorstSeller = () => {
    const sortedSellers = state?.sellers.sort((a, b) => a?.numberOfSales - b?.numberOfSales);

    return {
      bestSeller: sortedSellers[sortedSellers?.length - 1],
      worstSeller: sortedSellers[0]
    };
  }

  return(
    <DataContext.Provider value={{ 
      state, 
      addSalesPerson, 
      removeSalesPerson,
      getBestAndWorstSeller,
      addCar, 
      sellCar,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export {
  DataProvider,
  DataContext
};
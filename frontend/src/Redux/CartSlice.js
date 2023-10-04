import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  useruid:
    window.localStorage.getItem("user") === ("" || null || undefined)
      ? ""
      : window.localStorage.getItem("user"),

  cartt_array:[],

  cartt_array_id:[],
    
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
 

    remove_data_to_local_storage: (state, action) => {

    
        window.localStorage.removeItem(`${action.payload}cartt_array`)
        window.localStorage.removeItem(`${action.payload}cartt_array_id`)
  

    },
  

    Add_cartt_array_to_localstorag: (state, action) => {
      state.useruid = action.payload;
      window.localStorage.setItem("user", state.useruid);

      if (state.useruid !== ("" || null || undefined)) {

      state.cartt_array =
        window.localStorage.getItem(`${state.useruid}cartt_array`) === null
          ? []
          : JSON.parse(
              window.localStorage.getItem(`${state.useruid}cartt_array`)
            );
            state.cartt_array_id =
      window.localStorage.getItem(`${state.useruid}cartt_array_id`) === null
      ? []
      : JSON.parse(
          window.localStorage.getItem(`${state.useruid}cartt_array_id`)
        )
      }

    },

    //////////////////////////
    Addproduct_to_cart: (state, action) => {
      const object_carttt = { ...action.payload, quantité: 1 };
      state.cartt_array.push(object_carttt);
      state.cartt_array_id.push(action.payload.id);

      if (state.useruid !== ("" || null || undefined)) {
        window.localStorage.setItem(
          `${state.useruid}cartt_array`,
          JSON.stringify(state.cartt_array)
        );
        window.localStorage.setItem(
          `${state.useruid}cartt_array_id`,
          JSON.stringify(state.cartt_array_id)
        );
      }
      
    },

    //////////////////////////
    incremente: (state, action) => {
      const incremente_product = state.cartt_array.find((item) => {
        return item.id === action.payload.id;
      });
      incremente_product.quantité++;

      if (state.useruid !== ("" || null || undefined)) {
        window.localStorage.setItem(
          `${state.useruid}cartt_array`,
          JSON.stringify(state.cartt_array)
        );
      }
    },

    /////////////////////////////:
    decremente: (state, action) => {
      const decremente_product = state.cartt_array.find((item) => {
        return item.id === action.payload.id;
      });
      decremente_product.quantité--;
      let new_array;
      let new_array_id;

      if (decremente_product.quantité < 1) {
        new_array = state.cartt_array.filter((item) => {
          return item !== decremente_product;
        });

        new_array_id = state.cartt_array_id.filter((item) => {
          return item !== decremente_product.id;
        });

        state.cartt_array = new_array;
        state.cartt_array_id = new_array_id;
      
      }

      if (state.useruid !== ("" || null || undefined)) {
        window.localStorage.setItem(
          `${state.useruid}cartt_array`,
          JSON.stringify(state.cartt_array)
        );

        window.localStorage.setItem(
          `${state.useruid}cartt_array_id`,
          JSON.stringify(state.cartt_array_id)
        );
      }
     
    
    
      


    },

    /////////////////////////
    delete_cart: (state, action) => {
      const new_array = state.cartt_array.filter((item) => {
        return item.id !== action.payload.id;
      });

      const new_array_id = state.cartt_array_id.filter((item) => {
        return item !== action.payload.id;
      });

      state.cartt_array = new_array;
      state.cartt_array_id = new_array_id;


      if (state.useruid !== ("" || null || undefined)) {
        window.localStorage.setItem(
          `${state.useruid}cartt_array`,
          JSON.stringify(state.cartt_array)
        );

        window.localStorage.setItem(
          `${state.useruid}cartt_array_id`,
          JSON.stringify(state.cartt_array_id)
        );
      }

      



    },
  },
});

// Action creators are generated for each case reducer function
export const {
  Addproduct_to_cart,
  incremente,
  decremente,
  delete_cart,
  Add_cartt_array_to_localstorag,
  remove_data_to_local_storage,
} = counterSlice.actions;

export default counterSlice.reducer;

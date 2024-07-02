import streamlit as st
import pandas as pd

# Initialize a DataFrame to store the outputs
df = pd.DataFrame(columns=['Value'])

# Define a function to handle button click
def on_button_click():
    st.write("Button clicked!")
    df.loc[len(df)] = ['open']
    st.write("Saved 'open' to DataFrame.")

# Streamlit app title
st.title('Streamlit Button and Shortcut Example')

# Add a button to the app
if st.button('Open'):
    on_button_click()

# Handle shortcut key press 's'
if st.session_state.key_pressed == 's':
    df.loc[len(df)] = ['open']
    st.write("Shortcut 's' pressed! Saved 'open' to DataFrame.")

# Register a shortcut 's'
st.experimental_set_query_params(shortcut='s')
if 'shortcut' in st.experimental_get_query_params().keys() and st.experimental_get_query_params()['shortcut'] == 's':
    st.session_state.key_pressed = 's'

# Display the DataFrame
st.write('Current DataFrame:')
st.write(df)

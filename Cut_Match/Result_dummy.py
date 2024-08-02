import streamlit as st
import pygal
from pygal.style import LightSolarizedStyle
from collections import defaultdict
from statistics import mean
import pandas as pd
import base64

# Load data from CSV
file_path = "Baru_matchDummy.csv"
data = pd.read_csv(file_path)

# Streamlit UI
st.title('MLBB Match Radar Chart')

# Dropdowns for Date, Match ID, and Round
selected_date = st.selectbox('Select Date', sorted(data['Date'].unique()))
filtered_data_by_date = data[data['Date'] == selected_date]

selected_match_id = st.selectbox('Select Match ID', sorted(filtered_data_by_date['Match_id'].unique()))
filtered_data_by_match_id = filtered_data_by_date[filtered_data_by_date['Match_id'] == selected_match_id]

selected_round = st.selectbox('Select Round', sorted(filtered_data_by_match_id['Round'].unique()))
filtered_data = filtered_data_by_match_id[filtered_data_by_match_id['Round'] == selected_round]

# Function to calculate ratios relative to each metric
def calculate_ratios(filtered_data):
    ratios = defaultdict(lambda: defaultdict(float))
    
    for i in range(len(filtered_data['Player'])):
        for metric in ['K', 'D', 'A', 'Gold', 'Level']:
            player_value = filtered_data[metric].iloc[i]
            ratios[filtered_data['Player'].iloc[i]][metric] = player_value
    
    return ratios

# Calculate average metrics for each team
def calculate_averages(filtered_data):
    team_averages = defaultdict(lambda: defaultdict(list))
    
    for i in range(len(filtered_data['Player'])):
        team = filtered_data['Team'].iloc[i]
        for metric in ['K', 'D', 'A', 'Gold', 'Level']:
            team_averages[team][metric].append(filtered_data[metric].iloc[i])
    
    for team in team_averages:
        for metric in team_averages[team]:
            team_averages[team][metric] = mean(team_averages[team][metric])
    
    return team_averages

# Calculate ratios and averages
ratios = calculate_ratios(filtered_data)
team_averages = calculate_averages(filtered_data)

# Initialize radar charts with custom style and background color
radar_chart_team = pygal.Radar(style=LightSolarizedStyle, background='transparent', legend_at_bottom=True)
radar_chart_enemy = pygal.Radar(style=LightSolarizedStyle, background='transparent', legend_at_bottom=True)

# Define metrics and labels
metrics = ['K', 'D', 'A', 'Gold', 'Level']
radar_chart_team.x_labels = metrics
radar_chart_enemy.x_labels = metrics

# Find maximum values for normalization
max_values = {metric: max(filtered_data[metric]) for metric in metrics}

# Get the teams involved
teams = filtered_data['Team'].unique()
team1, team2 = teams[0], teams[1]

# Add each player's data for each metric (Team 1)
for player in ratios:
    if filtered_data[filtered_data['Player'] == player]['Team'].iloc[0] == team1:
        player_data = [ratios[player][metric] / max_values[metric] for metric in metrics]
        raw_data = [ratios[player][metric] for metric in metrics]
        hero = filtered_data[filtered_data['Player'] == player]['Pick'].iloc[0]
        radar_chart_team.add(f"{player} ({hero})", [{'value': player_data[i], 'label': f'{metrics[i]}: {player_data[i]:.2f} (Raw: {raw_data[i]})'} for i in range(len(metrics))], fill=True)

# Add each player's data for each metric (Team 2)
for player in ratios:
    if filtered_data[filtered_data['Player'] == player]['Team'].iloc[0] == team2:
        player_data = [ratios[player][metric] / max_values[metric] for metric in metrics]
        raw_data = [ratios[player][metric] for metric in metrics]
        hero = filtered_data[filtered_data['Player'] == player]['Pick'].iloc[0]
        radar_chart_enemy.add(f"{player} ({hero})", [{'value': player_data[i], 'label': f'{metrics[i]}: {player_data[i]:.2f} (Raw: {raw_data[i]})'} for i in range(len(metrics))], fill=True)

# Add average data for the first team
team_data = [team_averages[team1][metric] / max_values[metric] for metric in metrics]
raw_team_data = [team_averages[team1][metric] for metric in metrics]
radar_chart_team.add(f'Avg Team: {team1}', [{'value': team_data[i], 'label': f'{metrics[i]}: {team_data[i]:.2f} (Raw: {raw_team_data[i]})'} for i in range(len(metrics))], stroke_style={'width': 1.5, 'dasharray': '2, 2'})

# Add average data for the second team
enemy_data = [team_averages[team2][metric] / max_values[metric] for metric in metrics]
raw_enemy_data = [team_averages[team2][metric] for metric in metrics]
radar_chart_enemy.add(f'Avg Enemy: {team2}', [{'value': enemy_data[i], 'label': f'{metrics[i]}: {enemy_data[i]:.2f} (Raw: {raw_enemy_data[i]})'} for i in range(len(metrics))], stroke_style={'width': 1.5, 'dasharray': '2, 2'})

# Render the radar charts as SVG
radar_svg_team = radar_chart_team.render()
radar_svg_enemy = radar_chart_enemy.render()

# Display the SVGs using <embed> tag in Streamlit
st.title(f'Data {team1} Match Result ')
st.write(f'<embed type="image/svg+xml" src="data:image/svg+xml;base64,{base64.b64encode(radar_svg_team).decode("utf-8")}" />', unsafe_allow_html=True)
st.title(f'Data {team2} Match Result ')
st.write(f'<embed type="image/svg+xml" src="data:image/svg+xml;base64,{base64.b64encode(radar_svg_enemy).decode("utf-8")}" />', unsafe_allow_html=True)

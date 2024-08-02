import streamlit as st
import pygal
from pygal.style import LightSolarizedStyle
from collections import defaultdict
from statistics import mean
import base64

# Data
data = {
    'Team': ['HomeBois', 'HomeBois', 'HomeBois', 'HomeBois', 'HomeBois', 'Entity7', 'Entity7', 'Entity7', 'Entity7', 'Entity7'],
    'Player': ['Sepat', 'Chibi', 'Udil', 'Xorn', 'Nets', 'Markinho', 'Hide on bush', 'Chan', 'Erwin', 'Furyy'],
    'Pick': ['Terizla', 'Ling', 'Valentina', 'Chou', 'Bruno', 'Edith', 'Karina', 'Lunox', 'Grock', 'Clint'],
    'Role': ['Exp-lane', 'Jungler-line', 'Mid-lane', 'Roamer-lane', 'gold-lane', 'Exp-lane', 'Jungler-line', 'Mid-lane', 'Roamer-lane', 'gold-lane'],
    'K': [4, 7, 3, 0, 2, 0, 1, 6, 0, 1],
    'D': [1, 3, 3, 0, 1, 4, 3, 1, 3, 5],
    'A': [5, 5, 9, 7, 5, 3, 3, 1, 5, 1],
    'Gold': [8332, 12240, 8810, 6556, 11359, 7338, 8606, 10552, 6944, 8847],
    'Level': [14, 15, 15, 13, 15, 12, 14, 14, 12, 13]
}

# Function to calculate ratios relative to each metric
def calculate_ratios(data):
    ratios = defaultdict(lambda: defaultdict(float))
    
    for i in range(len(data['Player'])):
        for metric in ['K', 'D', 'A', 'Gold', 'Level']:
            player_value = data[metric][i]
            ratios[data['Player'][i]][metric] = player_value
    
    return ratios

# Calculate average metrics for each role and team
def calculate_averages(data):
    role_averages = defaultdict(lambda: defaultdict(list))
    team_averages = defaultdict(lambda: defaultdict(list))
    
    for i in range(len(data['Player'])):
        role = data['Role'][i]
        team = data['Team'][i]
        for metric in ['K', 'D', 'A', 'Gold', 'Level']:
            role_averages[role][metric].append(data[metric][i])
            team_averages[team][metric].append(data[metric][i])
    
    for role in role_averages:
        for metric in role_averages[role]:
            role_averages[role][metric] = mean(role_averages[role][metric])
    
    for team in team_averages:
        for metric in team_averages[team]:
            team_averages[team][metric] = mean(team_averages[team][metric])
    
    return role_averages, team_averages

# Calculate ratios and averages
ratios = calculate_ratios(data)
role_averages, team_averages = calculate_averages(data)

# Initialize radar chart with custom style and background color
radar_chart = pygal.Radar(style=LightSolarizedStyle, background='transparent', legend_at_bottom=True)

# Define metrics and labels
metrics = ['K', 'D', 'A', 'Gold', 'Level']
radar_chart.x_labels = metrics

# Find maximum values for normalization
max_values = {metric: max(data[metric]) for metric in metrics}

# Add each player's data for each metric
for player in ratios:
    player_data = [ratios[player][metric] / max_values[metric] for metric in metrics]
    raw_data = [ratios[player][metric] for metric in metrics]
    radar_chart.add(player, [{'value': player_data[i], 'label': f'{metrics[i]}: {player_data[i]:.2f} (Raw: {raw_data[i]})'} for i in range(len(metrics))], fill=True)

# Add average data for roles and teams
for role in role_averages:
    role_data = [role_averages[role][metric] / max_values[metric] for metric in metrics]
    raw_role_data = [role_averages[role][metric] for metric in metrics]
    radar_chart.add(f'Avg Role: {role}', [{'value': role_data[i], 'label': f'{metrics[i]}: {role_data[i]:.2f} (Raw: {raw_role_data[i]})'} for i in range(len(metrics))], stroke_style={'width': 1.5, 'dasharray': '5, 5'})

for team in team_averages:
    team_data = [team_averages[team][metric] / max_values[metric] for metric in metrics]
    raw_team_data = [team_averages[team][metric] for metric in metrics]
    radar_chart.add(f'Avg Team: {team}', [{'value': team_data[i], 'label': f'{metrics[i]}: {team_data[i]:.2f} (Raw: {raw_team_data[i]})'} for i in range(len(metrics))], stroke_style={'width': 1.5, 'dasharray': '2, 2'})

# Render the radar chart as SVG
radar_svg = radar_chart.render()

# Display the SVG using <embed> tag in Streamlit
st.write(f'<embed type="image/svg+xml" src="data:image/svg+xml;base64,{base64.b64encode(radar_svg).decode("utf-8")}" />', unsafe_allow_html=True)

# Mobile Legends Analysis

A web tool for analyzing Mobile Legends: Bang Bang matches.

# M5 Tournament 2023 Analysis
In the Mobile Legends analysis file, you will find data from the Mobile Legends M5 World Knockout Stage Results. The M5 World Championship, organized by Moonton, serves as the conclusive event and ultimate showdown of the MLBB 2023 Competitive Season.

In a groundbreaking move, M5 has incorporated the Wildcard stage for the first time, along with a boost in the prize pool from $800,000 to $900,000 USD. Notably, this edition of the World Championship marks a historic occasion as it will be conducted in distinct countries.

All the file explanations include "Ban & Pick Data": Data on bans and picks made by players in the team. "Hero & Role": Data on heroes and their statistics. "Full Data": Comprehensive match data. "Team And Players": Information on teams and player names. "Battle Spell": Data on the names and descriptions of battle spells. "Item Stats": Data on the names and descriptions of items. "Jungle & Roam": Data on the names and descriptions of jungle and roam aspects.

Explanation: "From the data contained in this file, various simple analyses can be conducted, including:

- Types of heroes used in a team.
- Types of spells, emblems, and talents used by the team.
- Team formations and more."

## Example Code 
# Load Dataset
![Load Dataset](https://github.com/boycakra/Mobile-Legend-analisis/assets/48791469/14bdb3ac-d355-4131-ad1e-b4009e14ca66)
# Kaggle Dataset: Complete Match Data Overview
This comprehensive dataset provides a detailed overview of match data for a gaming platform, encompassing various aspects such as team matchups, player performances, and in-game statistics. The key components of the dataset are as follows:
## Match Information:
- **Date:** The date on which the match took place.
- **Match:** A unique identifier or number indicating the Team vs. Team matchup.
- **Team:** The name of the team participating in the match.

## Hero Ban/Pick Details:
- **Ban:** The hero banned by the team.
- **Players:** Player name or identifier.
- **Role Ban:** The role of the banned hero.
- **Pick:** The hero selected by the team.
- **Role Pick:** The role of the picked hero.
- **Order Ban:** The sequence in which the ban occurred.
- **Order Pick:** The sequence in which the pick occurred.

## Individual Player Performance Metrics:
- **MVP:** Most Valuable Player in the match.
- **Time:** The duration of the match.
- **Spell:** The spell used by the player.
- **Emblem:** The emblem chosen by the player.
- **Talents 1, 2, 3:** Talent choices made by the player.
- **K (Kills):** Total kills by the player in the match.
- **D (Deaths):** Total deaths by the player in the match.
- **A (Assists):** Total assists by the player in the match.
- **Gold:** Total gold earned by the player in the match.

## Team Objective Statistics:
- **Tower:** Total objective monster kills by Team statistics.
- **Lord:** Total objective monster kills by Team statistics.
- **Turtle:** Total objective monster kills by Team statistics.
- **Blue Buff:** Total objective monster kills by Team statistics.
- **Red Buff:** Total objective monster kills by Team statistics.

This dataset provides a comprehensive overview of match data, including team matchups, player performances, and in-game statistics. It serves as a valuable resource for analyzing gaming dynamics, team strategies, and individual player contributions.


# Convert Data frame column gold into numeric :
![Convert into numeric Gold](https://github.com/boycakra/Mobile-Legend-analisis/assets/48791469/6303a79d-ce2d-441a-99a8-da1fb27cb325)

# Distributin Hero Role Ban and Pick Each Tim :
![Role Ban by Team](https://github.com/boycakra/Mobile-Legend-analisis/assets/48791469/2e20fc13-b80e-4168-bc59-bd5136049e74)

![Role Pick by Team](https://github.com/boycakra/Mobile-Legend-analisis/assets/48791469/c5f39a3c-bed6-46ca-94bf-fa72948dd678)

# Etc
You can See the Full analisis Note book in https://colab.research.google.com/drive/1JpyCu7q1CGVRo969kv44coHpcsK6HB6x?usp=sharing or the file named https://colab.research.google.com/drive/1JpyCu7q1CGVRo969kv44coHpcsK6HB6x

https://www.kaggle.com/datasets/bcakra/mobile-legend-m5-world-knockout-stage-results


This is an analysis tool for Mobile Legends: Bang Bang matches. This tool helps in highlighting important events in the game, such as team fights, turret attacks, and more.

## Dependency
- Python 3.8 and above
- pip

## How to Run
* Create a virtual environment
  ```python -m venv env```
* Activate the environment
  ```env/Scripts/activate.bat // In CMD```
  ```env/Scripts/Activate.ps1 // In PowerShell```
  ```source env/bin/activate // In Linux```

* Install Dependencies
  ```pip install -r requirement.txt```

* Run the application
  ```python app.py```

## Usage
After the application is running, you can upload Mobile Legends: Bang Bang match recordings for analysis. This tool allows you to highlight events such as team fights, turret attacks, and other important occurrences in the game.

## Contribution
We welcome contributions and improvement suggestions for this Mobile Legends: Bang Bang match analysis tool. If you want to contribute, please create a pull request to this repository.

We hope this tool is helpful in analyzing Mobile Legends: Bang Bang matches!

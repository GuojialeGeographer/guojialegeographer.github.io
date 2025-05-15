[TOC]

# Preface

These notes are organized based on the recorded content of the "Application of Numerical Methods in Hydrological Models" training camp, aiming to systematically present the theory, methods, and practical applications of the SHUD simulation system. Through these notes, you will learn how to build, run, calibrate, and analyze the SHUD model, and understand its value in hydrological research and applications.

> “Clouds move westward, ceaseless through winter and summer; springs flow eastward, day and night without rest; above, never exhausted; below, never full; the small becomes great, the heavy becomes light; such is the circular path.”
>
> ——**Lü Buwei, "Lüshi Chunqiu", ca. 239 BC(?)**

> “The highest good is like water; water benefits all things and does not compete.”
>
> ——**Laozi, "Tao Te Ching", 4th century BC**

> Science and technology are artificial evolution. Theoretical validation by theoretical physicists requires waiting for cosmic phenomena to occur. Some theories cannot be verified in a scientist's lifetime—because the probability of natural phenomena is very low. Artificial experiments can greatly increase the probability of such phenomena occurring.
>
> ——**Chen Ping, 2019**

# 1. SHUD System Structure and Basic Principles

This chapter introduces the overall structure, basic principles, and the position of the SHUD simulation system in the development of hydrological models. Understanding these basic concepts is key to further learning and applying the SHUD model.

## 1.1. Classification and Development History of Hydrological Models

**Hydrological Model** is a simplified mathematical representation of real hydrological systems (such as watersheds), used to understand hydrological processes, predict phenomena (such as floods and droughts), and assess the impact of human activities and climate change on water resources.

Hydrological models can be classified by the degree of detail in describing internal processes and spatial handling (lumped vs. distributed), and by their theoretical basis (physical vs. conceptual).

### 1.1.1. Lumped Models

*   **Concept:** Treats the entire watershed as a single, homogeneous unit, ignoring spatial heterogeneity of hydrological processes and parameters. Inputs (like precipitation) and outputs (like runoff) are represented as averages or totals for the entire watershed.
*   **Examples:** Classic Unit Hydrograph, simplified modules of the Xinanjiang Model (although the Xinanjiang Model also includes distributed concepts).
*   **Core Assumption:** The watershed's response to inputs like rainfall is spatially uniform.
*   **Advantages:**
    *   **Simple structure:** Mathematically straightforward.
    *   **Few parameters:** Only a small number of parameters need calibration.
    *   **High computational efficiency:** Low computational load, fast operation.
    *   **Low data requirements:** Does not require high-precision or dense spatial data.
*   **Disadvantages:**
    *   **Cannot describe spatial heterogeneity:** Cannot reflect differences in hydrological processes at different locations within the watershed.
    *   **Ambiguous physical meaning:** Parameters often lack clear physical meaning and rely on calibration.
    *   **Limited applicability:** Not suitable for tasks requiring detailed spatial management or studying the effect of spatial variability on hydrological processes.
    *   **Poor transferability:** Calibrated parameters may not be applicable to other watersheds or periods.

### 1.1.2. Distributed Models

*   **Concept:** Divides the watershed into many small computational units (such as grid cells, irregular triangles, sub-basins, or Hydrologic Response Units - HRUs), simulating hydrological processes in each unit and considering exchanges between units. (Semi-distributed and fully distributed models)
*   **Examples:** SWAT (Soil and Water Assessment Tool), VIC (Variable Infiltration Capacity), **SHUD (Simulator for Hydrologic Unstructured Domains)**, MIKE SHE, TopModel (semi-distributed).
*   **Core Assumption:** Considers spatial heterogeneity within the watershed; each unit has its own physical parameters and state variables.
*   **Advantages:**
    *   **Describes spatial heterogeneity:** Can simulate the spatial distribution and dynamic changes of hydrological processes within the watershed.
    *   **Stronger physical basis (usually):** Many distributed models are based on physical processes, and parameters have physical meaning.
    *   **Wide applicability:** Suitable for refined water resource management, land use change impact assessment, non-point source pollution modeling, and ungauged basins (based on physical parameter estimation).
    *   **Supports multi-process coupling:** Facilitates coupling with surface, ecological, and other models.
*   **Disadvantages:**
    *   **Complex structure:** Contains many computational units and complex interactions.
    *   **Many parameters:** Requires parameterization for each unit or class; parameter acquisition and calibration are difficult.
    *   **High computational load:** Requires more computational resources and longer run times.
    *   **High data requirements:** Needs high-precision spatial input data (DEM, soil maps, land use maps) and meteorological drivers.
    *   **Scale effects:** Parameter/process validity may vary across spatial scales.

### 1.1.3. Physically-Based Models

*   **Concept:** Based on physical laws describing hydrological processes (e.g., conservation of mass, energy, momentum, Darcy's Law, Saint-Venant Equations, Manning's Equation). Model parameters usually have clear physical meaning and can, in principle, be obtained by measurement or laboratory analysis.
*   **Examples:** **SHUD**, MIKE SHE, HydroGeoSphere, ParFlow.
*   **Core Assumption:** Watershed hydrological processes can be described by known physical laws.
*   **Advantages:**
    *   **Solid theoretical foundation:** Parameters have clear physical meaning, aiding understanding of internal mechanisms.
    *   **Strong transferability (in theory):** If physical parameters are accurately obtained, the model should be applicable to different watersheds and periods.
    *   **Suitable for ungauged regions:** Can simulate in areas lacking long-term observations by measuring or estimating physical parameters.
    *   **Supports scenario analysis:** Can predict impacts of land use or climate change on hydrological processes.
*   **Disadvantages:**
    *   **Difficult data acquisition:** Detailed, spatially distributed physical parameters are costly and difficult to obtain.
    *   **Complex numerical solutions:** Control equations are usually nonlinear PDEs, requiring complex numerical methods (finite difference, finite element, **finite volume method**) and high computational resources.
    *   **Model simplification unavoidable:** Even physical models must simplify the real world's complexity.
    *   **Scale effect issues:** Uncertainty in applying point-scale parameters to block-scale model units.

### 1.1.4. Conceptual Models

*   **Concept:** Built on conceptual understanding of watershed hydrological processes, usually simplifying the watershed into a series of interconnected reservoirs or modules, using empirical or semi-empirical relationships to describe water transfer and transformation.
*   **Examples:** Xinanjiang Model, Sacramento Model (SAC-SMA), HBV Model.
*   **Core Assumption:** Watershed response to rainfall can be represented by a series of simplified runoff, routing, and storage processes.
*   **Advantages:**
    *   **Relatively simple structure:** Mathematically simpler than physical models.
    *   **Fewer parameters:** Requires fewer parameters for calibration.
    *   **Higher computational efficiency:** Lower computational load, faster operation.
    *   **Performs well with sufficient observations:** Can fit observed runoff well through parameter calibration.
*   **Disadvantages:**
    *   **Parameters lack physical meaning:** Usually lumped and empirical, difficult to measure directly, highly dependent on calibration.
    *   **Poor transferability:** Calibrated parameters may not apply to other watersheds or climates.
    *   **Cannot describe internal mechanisms:** Cannot clearly reveal internal physical processes or spatial distribution.
    *   **Not suitable for ungauged regions:** Cannot be effectively applied without observation data for calibration.

**SHUD Model** is positioned as a **distributed, physically-based hydrological model**. It aims to finely simulate watershed hydrological processes by solving physically-based control equations on an unstructured triangular mesh.

> **Figure Suggestion 1.1:** Insert a schematic diagram of hydrological model classification (showing lumped/distributed, physical/conceptual quadrants or hierarchy, marking SHUD's position)

## 1.2. SHUD Simulation System Components: SHUD, rSHUD, AutoSHUD

The SHUD simulation system consists of three main components, which work together to support the entire process from data preparation to model operation and result analysis:

### 1.2.1. SHUD (Simulator for Hydrologic Unstructured Domains)

*   **Role:** The core computational engine of the system.
*   **Functions:**
    *   Written in C/C++ for high-performance computing.
    *   Solves ODEs of hydrological processes on unstructured triangular grids using the **Finite Volume Method (FVM)**.
    *   Simulates canopy interception, snow accumulation/melt, evapotranspiration, surface runoff/routing, soil water movement (infiltration, unsaturated/saturated flow), groundwater flow, river flow, and coupling between hydrological units.
    *   The ODE system is expressed as:
        $$ \frac{d\mathbf{y}}{dt} = \mathbf{f}(t, \mathbf{y}) $$
        where $\mathbf{y}$ is the state vector (e.g., water level, soil moisture), $t$ is time.
*   **Features:**
    *   **Strong physical basis:** Main processes are based on physical laws.
    *   **Fully coupled:** Surface, soil, groundwater, and river processes are solved simultaneously at each time step, interacting with each other.
    *   **Numerical methods:** Uses FVM for spatial discretization and SUNDIALS/CVODE for time integration, ensuring numerical stability and accuracy.
    *   **Parallel computing:** Supports OpenMP for shared-memory parallelism, improving efficiency for large basins.

### 1.2.2. rSHUD

*   **Role:** An R-based GIS and hydrological analysis toolbox, serving as the official companion to SHUD.
*   **Functions:**
    *   **Preprocessing:** Watershed and river network extraction/simplification, DEM processing, soil/land use data handling, meteorological data conversion/interpolation, model input file generation.
    *   **Postprocessing:** Reading/analyzing/statistics of model output.
    *   **Calibration assistance:** Provides parameter sensitivity analysis, optimization algorithm interfaces (e.g., CMA-ES).
    *   **Visualization:** Plots runoff hydrographs, spatial maps, water balance charts, etc.
    *   **Global open data interfaces:** Access to common global geodata sets.
*   **Features:** Leverages R's strong data processing, statistical analysis, and visualization capabilities to provide a convenient environment for SHUD users. Uses `Rcpp` for performance-critical tasks.

### 1.2.3. AutoSHUD

*   **Role:** An automated modeling workflow built on rSHUD and other R scripts.
*   **Functions:** Packages multiple SHUD modeling steps (data prep, preprocessing, model building, initial run, parameter file generation, etc.) into configurable scripts. Users can quickly set up a basin SHUD model by editing a core config file (`.autoshoot.txt`).
*   **Features:** Aims to improve modeling efficiency and reproducibility, lowering the technical barrier for SHUD modeling. Especially suitable for rapid modeling or scenario analysis of many basins.

> **Figure Suggestion 1.2:** Insert a schematic diagram of SHUD system structure (showing SHUD, rSHUD, AutoSHUD, their roles and data/control flow)

## 1.3. SHUD Model Development (Origin and Differences from PIHM)

The SHUD model was developed based on the PIHM model, inheriting its core ideas and making significant improvements.

### 1.3.1. PIHM (Penn State Integrated Hydrologic Model)

*   **Origin:** Developed by Prof. Christopher Duffy's team at Penn State University, based on the "two-state integral-balance" model proposed by Duffy in 1996.
*   **Core Idea:** Simplifies soil water movement into unsaturated and saturated zones, using FVM-based integral balance equations to describe water exchange.
*   **Key Versions/Tools:**
    *   **PIHM v1.0:** Developed by Dr. Yizhong Qu, milestone in PIHM development, added evapotranspiration and river calculations.
    *   **PIHM v2.0:** Enhanced land surface processes and land use impacts.
    *   **PIHMgis:** QGIS-based GUI tool for data prep, model running, result analysis, greatly promoting PIHM application.
    *   **Coupled modules:** Multiple coupled models based on PIHM, e.g., Flux-PIHM (with NOAH LSM), LE-PIHM (landscape evolution), RT-PIHM (chemical transport), MM-PIHM (multi-module integration).

### 1.3.2. Key Differences between SHUD and PIHM

Although SHUD inherits the "two-state integral-balance" and FVM concepts from PIHM, it is a complete redesign and code rewrite, and the two are no longer compatible in implementation or function.

*   **Code base:** SHUD uses new C++ OOP for modularity, maintainability, and efficiency, avoiding legacy issues in old PIHM code.
*   **Watershed topology and river treatment:**
    *   PIHM: Rivers are adjacent to two triangular slopes, which can generate many small, irregular triangles in complex river networks, increasing computational load and possibly causing instability. Users often need to manually adjust river networks.
    *   SHUD: River units overlay triangles, with water exchange based on hydraulic gradients, simplifying mesh generation, improving efficiency/stability, and reducing river network simplification needs.
*   **Hydrological process formulas and algorithms:** SHUD adjusts/optimizes mathematical expressions and algorithms for some processes for more reasonable/effective simulation.
*   **Data structures and file formats:** SHUD uses different internal structures and more readable, standardized I/O formats.
*   **Numerical solvers and technical aspects:**
    *   SHUD supports newer SUNDIALS/CVODE versions.
    *   Improved OpenMP parallelism.
    *   Added automatic input/parameter checking.
    *   Debug options for monitoring anomalies and memory ops.
    *   Supports saving model state at specified steps for future runs.

> **Figure Suggestion 1.3:** Insert PIHM/SHUD development and branching diagram (tree/timeline, showing PIHM versions, coupled models, PIHMgis, and SHUD's independent evolution)

## 1.4. Key Features and Advantages of SHUD

*   **Physically-based processes:** Core equations are based on recognized physical laws, with physically meaningful parameters, supporting both gauged and ungauged basin simulation.
*   **Distributed and spatial heterogeneity:** Unstructured triangular mesh discretizes the basin, capturing terrain, soil, land use heterogeneity, and their hydrological impacts. Each mesh unit has independent neighbors, and water flow is determined by hydraulic gradients between units.
*   **Fully coupled simulation:** At each time step, surface, soil (unsaturated/saturated), groundwater, and river water exchanges are solved simultaneously, ensuring internal consistency and water balance.
*   **Flexible unstructured mesh:**
    *   **Adapts to complex terrain:** Triangular mesh fits irregular boundaries and complex features well.
    *   **Local refinement:** Allows denser mesh in key areas (e.g., near rivers, urban zones) and coarser mesh elsewhere, optimizing efficiency while maintaining accuracy.
*   **Adjustable spatiotemporal resolution:**
    *   **Temporal:** Internal time step is automatically adjusted by the CVODE solver for stability; output frequency can be set from minutes to daily or longer.
    *   **Spatial:** Mesh size can be adjusted from meters to kilometers as needed.
*   **Efficient, stable numerical solutions:** Uses advanced ODE solver SUNDIALS/CVODE, capable of handling large, stiff systems common in hydrological models.
*   **Open source and community collaboration:** SHUD, rSHUD, and AutoSHUD are open source on GitHub, encouraging use, modification, contribution, and discussion.
    *   Non-commercial use is usually free.
    *   Commercial use or patented tech requires appropriate licensing.

## 1.5. Application Fields and Value of the SHUD System

With its physical basis and distributed features, the SHUD model system has shown potential in many hydrological and related fields:

*   **Water resources assessment/management:** Simulates/predicts the spatiotemporal dynamics of water balance components (precipitation, evapotranspiration, runoff, groundwater recharge/discharge, soil moisture, snow water equivalent, reservoir storage) at basin or regional scales, supporting planning, scheduling, and sustainable use.
*   **Flood forecasting/risk assessment:**
    *   **Flash flood warning:** Simulates rapid runoff/routing in small basins under intense rainfall, supporting early warning and evacuation.
    *   **Regional flood simulation:** Simulates flood processes in large/medium basins (peak flow, timing, inundation extent/depth), supporting flood mitigation decisions.
    *   **Urban waterlogging simulation:** Combines high-res urban terrain, imperviousness, and drainage info to simulate formation, development, and dissipation of urban floods.
*   **Ecohydrological process research:**
    *   **Vegetation-water relations:** Simulates evapotranspiration, soil moisture dynamics, and vegetation impacts on water cycle.
    *   **Wetland hydrology:** Simulates connectivity, water level fluctuations, and water exchange in wetlands.
*   **Environmental hydrology and water quality modeling (via coupling):** SHUD can be coupled with pollutant transport, hydrochemistry, and other models to simulate non-point source pollution, nutrient cycling, eutrophication, etc.

# ePickup & ePOD Admin Dashboard

## Project Overview

The **ePickup & ePOD Admin Dashboard** provides administrators with real-time insights and control over package pickup and delivery operations. It aggregates data from mobile clients (drivers) and visualizes key metrics, alerts, and system tickets.

## Dashboard Modules

1. **Operation Report**
   Displays all pickup data collected by drivers: timestamps, locations, driver details, package IDs, and status.

2. **Delivery Module**
   Visualizes delivered packages with delivery time, recipient confirmation, and proof-of-delivery attachments.

3. **Routes Module**

   * **Active Routes**: Shows routes taken by each delivery personnel in the current shift, with GPS tracks.
   * **Predefined Routes**: Lists company-set routes for planning and historical comparison.

4. **SOS Module**
   Lists SOS alerts triggered by drivers, including driver ID, location, timestamp, and reason. Enables admins to acknowledge or escalate alerts.

5. **Geofence Report**
   Reports geofence events per district and location:

   * Entry/Exit logs for pickup points
   * Entry/Exit logs for delivery points

6. **Ticket Module**
   Allows admins to file, assign, and track bug reports or change requests. Fields include ticket ID, description, severity, status, and assigned developer.

7. **User Control Module**
   Manages user accounts, roles, and permissions. Features include:

   * Create/Edit/Delete users
   * Assign role-based access control (RBAC)
   * Audit logs of user actions

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/YourOrg/epod-admin-dashboard.git
   cd epod-admin-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install    # or yarn install
   ```

3. **Configure environment**
   Copy `.env.example` to `.env` and set the following variables:

   ```ini
   API_BASE_URL=https://api.yourdomain.com
   DATABASE_URL=postgres://user:pass@host:port/dbname
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server**

   ```bash
   npm run dev    # or yarn dev
   ```

   Dashboard available at `http://localhost:3000/admin`

## Usage

* **Login** with admin credentials.
* Navigate to the sidebar to access each module.
* Use filters (date range, driver ID, district) to refine the data.

## API Endpoints (partial)

| Module           | Endpoint                  | Method   | Description                       |
| ---------------- | ------------------------- | -------- | --------------------------------- |
| Operation Report | `/api/reports/pickups`    | GET      | Fetch all pickup records          |
| Delivery Module  | `/api/reports/deliveries` | GET      | Fetch all delivery records        |
| Routes Module    | `/api/routes/active`      | GET      | Fetch GPS tracks of active routes |
|                  | `/api/routes/predefined`  | GET      | Fetch predefined route templates  |
| SOS Module       | `/api/alerts/sos`         | GET      | Fetch SOS alert records           |
| Geofence Report  | `/api/geofences/events`   | GET      | Fetch geofence entry/exit logs    |
| Ticket Module    | `/api/tickets`            | GET/POST | List or create tickets            |
| User Control     | `/api/users`              | GET/POST | List or create users              |

## Contributing

* Fork the repo and create a feature branch (`git checkout -b feature/XYZ`).
* Commit changes (`git commit -m "Add XYZ feature"`).
* Push to branch (`git push origin feature/XYZ`) and open a Pull Request.
* Ensure tests pass and follow coding standards.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.



Folder Structure
my-admin-dashboard/
├── public/
│   ├── index.html
│   └── assets/          # static images, fonts, etc.
├── src/
│   ├── api/             # axios/fetch wrappers & endpoint definitions
│   │   ├── pickups.ts
│   │   ├── deliveries.ts
│   │   ├── routes.ts
│   │   └── sos.ts
│   ├── assets/          # module-agnostic styles, images
│   │   ├── styles/
│   │   └── icons/
│   ├── components/      # reusable UI bits
│   │   ├── Button/
│   │   ├── Modal/
│   │   └── Table/
│   ├── features/        # one folder per module
│   │   ├── operationReport/
│   │   │   ├── OperationReportPage.tsx
│   │   │   ├── OperationReportTable.tsx
│   │   │   └── types.ts
│   │   ├── delivery/
│   │   ├── routes/
│   │   ├── sos/
│   │   ├── geofence/
│   │   ├── tickets/
│   │   └── userControl/
│   ├── hooks/           # custom hooks (e.g. useFetch, useAuth)
│   ├── layouts/         # page shells (e.g. AdminLayout)
│   ├── store/           # Redux/MobX/Zustand slices
│   ├── utils/           # helpers and formatters
│   ├── App.tsx
│   └── index.tsx
├── .env
├── package.json
└── tsconfig.json


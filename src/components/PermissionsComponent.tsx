

const PermissionsComponent = ({ children,permission}:{
    children:any,
    permission:string
}) => {
  console.log(permission)
  const PERMISSIONS:string[] =  [
    "pickups:view",
    "deliveries:view",
    "routes:view",
    "routes:export",
    "sos:view",
    "geofence:view",
    "ticket:view",
    "ticket:edit",
    "ticket:delete"
  ]

    const hasPermission = PERMISSIONS.includes(permission)
  return (
    <div>
        {children}
    </div>
  )
}

export default PermissionsComponent
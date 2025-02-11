import { AlertComponent } from "@/components/alert";
import { ComponentProps, useEffect, useState } from "react"
import { v4 } from "uuid";

type AlertComponentProps = ComponentProps<typeof AlertComponent> & {
  id: string
}

export const useAlert = () => {
  const [alerts, setAlert] = useState<AlertComponentProps[]>([]);
  const showAlert = (alert: Omit<AlertComponentProps, 'id'>) => {
    setAlert((alerts) => [...alerts, {...alert, id: v4()}]);
  }

  const AlertComponentAutoDisappear = (props: AlertComponentProps) => {
    useEffect(() => {
      setTimeout(() => {
        setAlert((alerts) => [...alerts.filter((alert) => alert.id !== props.id)]);
      }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <AlertComponent {...props} />
    )
  }

  const AlertContainer = () => {
    return alerts.map((alert, index) => (
      <AlertComponentAutoDisappear {...alert} key={index} />
    ))
  }

  return {
    showAlert,
    AlertContainer,
  }
}
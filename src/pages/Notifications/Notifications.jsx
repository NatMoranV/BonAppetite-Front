import { faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getStockNotifications,
  updateNotificationOk,
} from "../../redux/actions/actions";

import styled from "styled-components";
import { CircleButton } from "../../components/CircleButton/CircleButton";
import { Loader } from "../../components/Modal/Loader";
import { TextButton } from "../../components/TextButton/TextButton";
import { ComboButton } from "../../components/ComboButton/ComboButton";

export const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);

  const newNotifications = notifications.filter(
    (notification) => notification.new === true
  );
  const oldNotifications = notifications.filter(
    (notification) => notification.new === false
  );

  const handleDone = (id) => {
    dispatch(updateNotificationOk(id));
  };

  useEffect(() => {
    dispatch(getStockNotifications());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  const [activeTab, setActiveTab] = useState("new"); // 'new' or 'old'

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <StyledView>
          <h6>Notificaciones</h6>

          <ComboButton text1={"Nuevas"} onClick1={() => toggleTab("new")} isActive1={activeTab === "new"} text2={"Previas"} onClick2={() => toggleTab("old")} isActive2={activeTab === "old"}/>

          <ContentContainer active={activeTab === "new"}>
            <NewNotificationsContainer>
              {newNotifications.length > 0 ? (
                newNotifications
                  .map((notification) => (
                    <NotificationContainer key={notification.id}>
                      <span>
                        {notification.message.split(".").map((part, index) => (
                          <p key={index}>
                            {index === 0 ? `${part}` : `${part}`}
                            {index === 0 && (
                              <>
                                <br />
                                <br />
                              </>
                            )}
                          </p>
                        ))}
                      </span>
                      <ButtonsContainer>
                        <NavLink to={`/manager/edit/${notification.idProduct}`}>
                          {" "}
                          <TextButton text={"Editar producto"} />{" "}
                        </NavLink>
                        <TextButton
                          text={"Ok"}
                          onClick={() => handleDone(notification.id)}
                        />
                      </ButtonsContainer>
                    </NotificationContainer>
                  ))
                  .reverse()
              ) : (
                <span>Todo en orden, no tienes notificaciones nuevas.</span>
              )}
            </NewNotificationsContainer>
          </ContentContainer>

          <ContentContainer active={activeTab === "old"}>
            <OldNotificationsContainer>
              {oldNotifications.length > 0 ? (
                oldNotifications
                  .map((notification) => (
                    <NotificationContainer key={notification.id}>
                      <span>{notification.message}</span>
                    </NotificationContainer>
                  ))
                  .reverse()
              ) : (
                <span>Todavía no has tenido notificaciones.</span>
              )}
            </OldNotificationsContainer>
          </ContentContainer>
        </StyledView>
      )}
    </>
  );
};

const StyledView = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  overflow-y: auto;
  padding: 10vh 4vw 15vh;
  box-sizing: border-box;
  transition: width 0.3s ease-in-out;
  gap: 2rem;

`;

const NewNotificationsContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: grid;
  gap: 1rem;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`;

const OldNotificationsContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: grid;
  gap: 1rem;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`;

const NotificationContainer = styled.div`
  width: 100%;
  height: auto;
  box-sizing: border-box;
  gap: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  background: ${(props) => props.theme.primary};
  box-shadow: ${(props) => props.theme.shortShadow};
`;

const ButtonsContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 1rem;
`;

const ContentContainer = styled.div`
  display: ${(props) => (props.active ? "flex" : "none")};
`;
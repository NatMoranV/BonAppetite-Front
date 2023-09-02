import React from "react";
import { NavLink } from "react-router-dom";
import {StyledFamilyCard} from "./StyledFamilyCard"


export const FamilyCard = () => {
    const {id, img, name} = props;
    return (
        <NavLink to={`/family/${id}`}>
            <StyledFamilyCard>
                <img src={img} alt="image" />
                <h6>{name}</h6>
            </StyledFamilyCard>
        </NavLink>

    )
}
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import cookies from "js-cookie";
import i18next from "i18next";


export default function HomePageModal() {
    const { t } = useTranslation()
    const [popoverOpen, setPopoverOpen] = useState(sessionStorage.getItem("false") ? false : true)
    const currentLanguageCode = cookies.get("i18next") || "kr"

    function handleClose() {
        sessionStorage.setItem("false", "안녕하세요~ :)")
        setPopoverOpen(false)
    }

    function changeLanguage() {
        if (currentLanguageCode === "en") {
            i18next.changeLanguage("kr")
        }
        else {
            i18next.changeLanguage("en")
        }
        window.location.reload();
    }

    return (
        <Modal show={popoverOpen} onHide={handleClose}>
            <Modal.Header closeButton>
                <strong>{t("warning")}!</strong>
            </Modal.Header>
            <Modal.Body>
                <p>{t("delivery_warning")}!</p>
                <p>({t("delivery_recommendation")})</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => handleClose()} variant="danger">{t("go_to_shopping")}</Button>
                <Button onClick={() => {changeLanguage()}}>{t("change_language")}</Button>
            </Modal.Footer>

        </Modal>
    )
}
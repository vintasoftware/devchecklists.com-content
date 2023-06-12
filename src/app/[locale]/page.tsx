import HomePage from "../page";

const LocalizedHomePage = ({
    params: { locale },
}: {
    params: { locale: string };
}) => <HomePage locale={locale} />;

export default LocalizedHomePage;

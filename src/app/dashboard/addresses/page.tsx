import AddAddress from "@/components/dashboard/addresses/AddAddress";
import AddressesList from "@/components/dashboard/addresses/AddressesList";
import { DashboardAddressProvider } from "@/context/dashboard/DashboardAddressContext";

const DashboardAddressesPage = () => {
  return (
    <DashboardAddressProvider>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-yekan-bakh-bold">آدرس های من</h3>
        <AddAddress />
      </div>
      <hr className="my-3" />
      <AddressesList />
    </DashboardAddressProvider>
  );
};

export default DashboardAddressesPage;

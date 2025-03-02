import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

// const AppLayout = () => WrappedComponent => {
//     return (props) => {

//         return (
//             <div className='font-sans'>
//                 <Navbar />
//                 <WrappedComponent {...props} />
//             </div>
//         )
//     }
// }

const AppLayout = ({ children }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Navbar />
            <View style={styles.content}>
                {children}
            </View>
            <BottomNav />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb', // gray-50 equivalent
    },
    content: {
        flex: 1,
    }
});

export default AppLayout;

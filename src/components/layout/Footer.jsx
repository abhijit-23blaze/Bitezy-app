import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function Footer() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>Bitezy</Text>
                    <Text style={styles.copyright}>© 2024 Bitezy Limited</Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Company</Text>
                    <TouchableOpacity>
                        <Text style={styles.link}>About Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.link}>Team</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Contact us</Text>
                    <TouchableOpacity>
                        <Text style={styles.link}>Help & Support</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.link}>Partner With Us</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.link}>Ride With Us</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Available in:</Text>
                    <Text style={styles.text}>Sricity</Text>
                    <Text style={styles.text}>Tada</Text>
                    <Text style={styles.text}>Soon to come near you as well :)</Text>
                </View>
                
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Legal</Text>
                    <TouchableOpacity>
                        <Text style={styles.link}>Terms & Conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.link}>Cookie Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.link}>Privacy Policy</Text>
                    </TouchableOpacity>
                    
                    <Text style={[styles.sectionTitle, styles.socialTitle]}>Social Links</Text>
                    <View style={styles.socialLinks}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialText}>In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialText}>Ig</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialText}>Fb</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialText}>Tw</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    logoContainer: {
        width: '100%',
        marginBottom: 20,
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#f97316',
        marginBottom: 8,
    },
    copyright: {
        fontSize: 12,
        color: '#666',
    },
    section: {
        width: '48%',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333',
    },
    link: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    socialTitle: {
        marginTop: 16,
    },
    socialLinks: {
        flexDirection: 'row',
        marginTop: 8,
    },
    socialButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    socialText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#666',
    },
});

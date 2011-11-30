
package org.cloudfoundry.spinup.authentication;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import org.cloudfoundry.client.lib.CloudApplication;
import org.cloudfoundry.client.lib.CloudFoundryClient;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

/**
 * Propagates a {@link SharedSecret} to a running cloud foundry application.
 * 
 * @author Phillip Webb
 */
public class SharedSecretPropagation {

    // Cloud foundry cannot cope with dots in env variables
    static final String ENV_KEY = (SharedSecretPropagation.class.getName() + ".SECRET").replaceAll("\\.", "_");

    /**
     * Send the specified shared secret to a running cloud foundry application.
     * 
     * @param client client
     * @param secret the secret to send
     * @param applicationName the application to send the secret to
     */
    public void sendTo(CloudFoundryClient client, SharedSecret secret, String applicationName) {
        Assert.notNull(client, "Client must not be null");
        Assert.notNull(applicationName, "ApplicationName must not be null");
        CloudApplication application = client.getApplication(applicationName);
        sendTo(client, secret, application);
    }

    /**
     * Send the specified shared secret to a running cloud foundry application.
     * 
     * @param client client
     * @param secret the secret to send
     * @param application the application to send the secret to
     */
    public void sendTo(CloudFoundryClient client, SharedSecret secret, CloudApplication application) {
        // FIXME only do this is necessary
        Assert.notNull(client, "Client must not be null");
        Assert.notNull(application, "Application must not be null");
        Map<String, String> env = new HashMap<String, String>();
        env.putAll(application.getEnvAsMap());
        env.put(ENV_KEY, Hex.encodeHexString(secret.getBytes()));
        client.updateApplicationEnv(application.getName(), env);
        client.restartApplication(application.getName());
    }

    /**
     * Get the shared secret for the currently running application. This method assumes that some other process has
     * {@link #sendTo(CloudFoundryClient, SharedSecret, CloudApplication) sent} the {@link SharedSecret} to the running
     * application.
     * 
     * @return the shared secret
     * @throw IllegalStateException if the secret cannot be obtained
     */
    public SharedSecret getForSelf() throws IllegalStateException {
        try {
            String secret = getEnv(ENV_KEY);
            Assert.state(StringUtils.hasLength(secret), "No shared secret has been propagated");
            return SharedSecret.fromBytes(Hex.decodeHex(secret.toCharArray()));
        } catch (DecoderException e) {
            throw new IllegalStateException("Unable to decode shared secret key", e);
        }
    }

    /**
     * Access a system environment variable. This method exists to enable unit testing of the class.
     * 
     * @param name the name of the environment variable
     * @return the variable value
     */
    protected String getEnv(String name) {
        return System.getenv(name);
    }
}
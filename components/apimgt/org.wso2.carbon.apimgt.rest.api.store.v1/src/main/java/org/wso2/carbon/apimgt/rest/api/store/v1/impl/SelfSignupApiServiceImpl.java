package org.wso2.carbon.apimgt.rest.api.store.v1.impl;

import org.wso2.carbon.apimgt.rest.api.store.v1.*;
import org.wso2.carbon.apimgt.rest.api.store.v1.dto.*;


import org.wso2.carbon.apimgt.rest.api.store.v1.dto.WorkflowResponseDTO;
import org.wso2.carbon.apimgt.rest.api.store.v1.dto.UserDTO;
import org.wso2.carbon.apimgt.rest.api.store.v1.dto.ErrorDTO;

import java.util.List;

import java.io.InputStream;
import org.apache.cxf.jaxrs.ext.multipart.Attachment;

import javax.ws.rs.core.Response;

public class SelfSignupApiServiceImpl extends SelfSignupApiService {
    @Override
    public Response selfSignupPost(UserDTO body){
        // do some magic!
        return Response.ok().entity(new ApiResponseMessage(ApiResponseMessage.OK, "magic!")).build();
    }
}
